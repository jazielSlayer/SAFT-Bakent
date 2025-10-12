import { connect } from '../database';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const sendAuthCode = async (req, res) => {
    const pool = await connect();
    const { email } = req.body;

    try {
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: 'Correo requerido y debe ser texto' });
        }

        const [userCheck] = await pool.query(
            'SELECT id FROM persona WHERE correo = ?',
            [email]
        );

        if (userCheck.length === 0) {
            return res.status(404).json({ message: 'Correo no registrado' });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await pool.query(
            'INSERT INTO Autenticacion (id, email, code, expires_at) VALUES (?, ?, ?, ?)',
            [crypto.randomUUID(), email, code, expiresAt]
        );

        console.log(`Enviando correo a ${email} con código ${code} a las ${new Date().toISOString()}`);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.CORREO_APP,
                pass: process.env.CONTRASENA_APP,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: '"SAFT" <tu-email@gmail.com>',
            to: email,
            subject: 'Código de Verificación',
            text: `Tu código de verificación es: ${code}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }
                        .header {
                            margin-bottom: 20px;
                        }
                        .header img {
                            width: 75px;
                            height: 75px;
                            display: block;
                            margin: 0 auto;
                        }
                        .content {
                            font-size: 16px;
                            color: #333333;
                            margin-bottom: 20px;
                            text-align: justify;
                        }
                        .code {
                            font-size: 32px;
                            font-weight: bold;
                            color: #333333;
                            margin: 20px 0;
                        }
                        .footer {
                            font-size: 12px;
                            color: #666666;
                            margin-top: 20px;
                            border-top: 1px solid #e0e0e0;
                            padding-top: 10px;
                            text-align: justify;
                        }
                        a {
                            color: #0366d6;
                            text-decoration: none;
                        }
                        a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                       <div class="header">
                            <img src="https://cdn-icons-png.flaticon.com/512/568/568033.png" alt="SAFT Email Icon" style="width: 75px; height: 75px; display: block; margin: 0 auto;">
                        </div>
                        <div>
                            <h2>Por favor, verifica tu identidad</h2>
                        </div>
                        <div class="content">    
                            <p>Aquí está tu código de autenticación sudo de SAFT:</p>
                        </div>
                        <div class="code">${code}</div>
                        <div class="content">  
                            <p>Este código es válido por 10 minutos y solo puede usarse una vez. Por favor, no compartas este código con nadie: nunca te lo pediremos por teléfono ni por correo electrónico.</p>
                            <p>Gracias,<br>El equipo de SAFT</p>
                        </div>
                        <div class="footer">
                            <p>Estás recibiendo este correo porque se solicitó un código de verificación para tu cuenta de SAFT. Si no fuiste tú, por favor ignora este mensaje.</p>
                            <p>SAFT - Sistema de Administración Financiera © ${new Date().getFullYear()} | <a href="mailto:support@saft.com">support@saft.com</a></p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        res.json({ success: true, message: 'Código enviado exitosamente' });
    } catch (error) {
        console.error('Error enviando código de autenticación:', error);
        res.status(500).json({ message: 'Error al enviar el código de autenticación' });
    }
};

export const verifyAuthCode = async (req, res) => {
    const pool = await connect();
    const { email, code } = req.body;

    try {
        if (!email || !code) {
            return res.status(400).json({ message: 'Correo y código son requeridos' });
        }

        const [rows] = await pool.query(
            'SELECT * FROM Autenticacion WHERE email = ? AND code = ? AND expires_at > NOW()',
            [email, code]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Código inválido o expirado' });
        }

        await pool.query(
            'DELETE FROM Autenticacion WHERE email = ? AND code = ?',
            [email, code]
        );

        res.json({ success: true, message: 'Código verificado exitosamente' });
    } catch (error) {
        console.error('Error verificando código de autenticación:', error);
        res.status(500).json({ message: 'Error al verificar el código de autenticación' });
    }
};