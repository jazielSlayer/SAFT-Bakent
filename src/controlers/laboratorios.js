import {connect} from '../database'


export const getLaboratories = async(req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECt * FROM laboratorios");
    res.json(rows);
}
export const getLaboratory = async (req, res) => {
       const connection = await connect();
       const [rows] = await connection.query("SELECT * FROM laboratorios WHERE laboratorio_id = ?", [req.params.id]);
    res.json(rows[0]);
}
export const getLaboratoryCount = async (req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECT COUNT(*) FROM laboratorios");
    res.json(rows[0]['COUNT(*)']);
}
export const saveLaboratory = async (req, res) =>{
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO laboratorios (nombre, ubicacion, tipo_laboratorio, capacidad, responsable_id) VALUES (?, ?, ?, ?, ?)", 
        [req.body.nombre, 
            req.body.ubicacion, 
            req.body.tipo_laboratorio, 
            req.body.capacidad, 
            req.body.responsable_id]);  
    res.json({
        id: results.resultId,
    });

}
export const deleteLaboratory = async (req, res) =>{
    const connection = await connect();
    const result = await connection.query("DELETE FROM Laboratorios WHERE laboratorio_id = ?", [req.params.id]);
    console.log(result);
    res.json({
        message: 'Laboratorio eliminado'
    });
}

export const updateLaboratory = async (req, res) =>{
   const connection = await connect();
   const results = await connection.query("UPDATE laboratorios SET ? WHERE laboratorio_id = ?",
        [req.body, 
            req.params.id]);
    console.log(results);
    res.json({
        message: 'Laboratorio actualizado'
    });
}