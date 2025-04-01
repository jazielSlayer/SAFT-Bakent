import {connect} from '../database'


export const getMaintenaint = async(req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECt * FROM mantenimiento");
    res.json(rows);
}
export const getMainten = async (req, res) => {
       const connection = await connect();
       const [rows] = await connection.query("SELECT * FROM mantenimiento WHERE mantenimiento_id = ?", [req.params.id]);
    res.json(rows[0]);
}
export const getMaintenCount = async (req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECT COUNT(*) FROM mantenimiento");
    res.json(rows[0]['COUNT(*)']);
}
export const saveMainten = async (req, res) =>{
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO mantenimiento (equipo_id, fecha_inicio, fecha_fin, descripcion, tecnico, costo) VALUES (?, ?, ?, ?, ?)", 
        [req.body.equipo_id,
            req.body.fecha_inicio, 
            req.body.fecha_fin, 
            req.body.descripcion, 
            req.body.tecnico,
            req.body.costo]);
    res.json({
        id: results.resultId,
        ...req.body
    });

}
export const deleteMainten = async (req, res) =>{
    const connection = await connect();
    const result = await connection.query("DELETE FROM mentenimiento WHERE mantenimiento_id = ?", [req.params.id]);
    console.log(result);
    res.json({
        message: 'Prestamo eliminado'
    });
}

export const updateMainten = async (req, res) =>{
   const connection = await connect();
   const results = await connection.query("UPDATE mantenimiento SET ? WHERE mantenimiento_id = ?",
        [req.body, 
            req.params.id]);
    console.log(results);
    res.json({
        message: 'Prestamo actualizado'
    });
}
