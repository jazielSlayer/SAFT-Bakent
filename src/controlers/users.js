import { connect } from '../database';
import bcrypt from 'bcryptjs'; // Añadir dependencia: npm install bcryptjs

// Registro de usuario
export const registerUser = async (req, res) => {
    const connection = await connect();
    const { nombre, apellido, email, password, tipo_usuario, numero_identificacion } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const [results] = await connection.query(
            "INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario, numero_identificacion) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, apellido, email, hashedPassword, tipo_usuario, numero_identificacion]
        );
        res.json({ id: results.insertId, nombre, apellido, email, tipo_usuario });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario" });
    }
};

// Login de usuario
export const loginUser = async (req, res) => {
    const connection = await connect();
    const { email, password } = req.body;
    try {
        const [rows] = await connection.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        res.json({ id: user.usuario_id, nombre: user.nombre, tipo_usuario: user.tipo_usuario });
    } catch (error) {
        res.status(500).json({ message: "Error en el login" });
    }
};


export const getUsers = async(req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM usuarios");
    res.json(rows);
}
export const getUser = async (req, res) => {
       const connection = await connect();
       const [rows] = await connection.query("SELECT * FROM usuarios WHERE usuario_id = ?", [req.params.id]);
    res.json(rows[0]);
}
export const getUserCount = async (req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECT COUNT(*) FROM usuarios");
    res.json(rows[0]['COUNT(*)']);
}
export const saveUser = async (req, res) =>{
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO usuarios (nombre, apellido, email, tipo_usuario,numero_identificacion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)", 
        [req.body.nombre, 
            req.body.apellido, 
            req.body.email, 
            req.body.tipo_usuario, 
            req.body.numero_identificacion,
            req.body.fecha_registro]);  
    res.json({
        id: results.resultId,
        ...req.body
    });

}
export const deleteUser = async (req, res) =>{
    const connection = await connect();
    const result = await connection.query("DELETE FROM usuarios WHERE usuario_id = ?", [req.params.id]);
    console.log(result);
    res.json({
        message: 'Usuario eliminado'
    });
}

export const updateUser = async (req, res) =>{
   const connection = await connect();
   const results = await connection.query("UPDATE usuarios SET ? WHERE usuario_id = ?",
        [req.body, 
            req.params.id]);
    console.log(results);
    res.json({
        message: 'Usuario actualizado'
    });
}