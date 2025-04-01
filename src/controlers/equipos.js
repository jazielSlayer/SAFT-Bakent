import {connect} from '../database'


export const getTeams = async(req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECt * FROM equipos");
    res.json(rows);
}
export const getTeam = async (req, res) => {
       const connection = await connect();
       const [rows] = await connection.query("SELECT * FROM equipos WHERE equipo_id = ?", [req.params.id]);
    res.json(rows[0]);
}
export const getTeamCount = async (req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECT COUNT(*) FROM equipos");
    res.json(rows[0]['COUNT(*)']);
}
export const saveTeam = async (req, res) =>{
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO Equipos (nombre, codigo_inventario, categoria_id, laboratorio_id, estado, descripcion, fecha_adquisicion) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [req.body.nombre, 
            req.body.codigo_inventario,
            req.body.categoria_id,
            req.body.laboratorio_id, 
            req.body.tipo_laboratorio, 
            req.body.estado, 
            req.body.descripcion,
            req.body.fecha_adquisicion]);  
    res.json({
        id: results.resultId,
        ...req.body
    });

}
export const deleteTeam = async (req, res) =>{
    const connection = await connect();
    const result = await connection.query("DELETE FROM Equipos WHERE equipo_id = ?", [req.params.id]);
    console.log(result);
    res.json({
        message: 'Equipo eliminado'
    });
}

export const updateTeam = async (req, res) =>{
   const connection = await connect();
   const results = await connection.query("UPDATE Equipos SET ? WHERE equipo_id = ?",
        [req.body, 
            req.params.id]);
    console.log(results);
    res.json({
        message: 'Equipo actualizado'
    });
}
