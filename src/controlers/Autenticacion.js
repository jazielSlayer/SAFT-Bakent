import { connect } from '../database';
import nodemailer from 'nodemailer';
import crypto from 'crypto'; // Para generar UUID

export const sendAuthCode = async (req, res) => {
    const pool = await connect();
    const { email } = req.body;

    try {
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: 'Correo requerido y debe ser texto' });
        }

        const [userCheck] = await pool.query(
            'SELECT id FROM persona WHERE correo = ?', // Usa el campo correcto de persona
            [email]
        );

        if (userCheck.length === 0) {
            return res.status(404).json({ message: 'Correo no registrado' });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

        await pool.query(
            'INSERT INTO Autenticacion (id, email, code, expires_at) VALUES (?, ?, ?, ?)',
            [crypto.randomUUID(), email, code, expiresAt]
        );

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
            html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`,
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