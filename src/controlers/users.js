import {connect} from '../database'


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