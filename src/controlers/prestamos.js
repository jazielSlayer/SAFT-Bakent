import {connect} from '../database'


export const getLoans = async(req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECt * FROM Prestamos");
    res.json(rows);
}
export const getLoan = async (req, res) => {
       const connection = await connect();
       const [rows] = await connection.query("SELECT * FROM Prestamos WHERE prestamo_id = ?", [req.params.id]);
    res.json(rows[0]);
}
export const getLoanCount = async (req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECT COUNT(*) FROM Prestamos");
    res.json(rows[0]['COUNT(*)']);
}
export const saveLoan = async (req, res) =>{
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO Prestamos (usuario_id, equipo_id, fecha_prestamo, fecha_devolucion_prevista, fecha_devolucion_real, estado, notas) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [req.body.usuario_id,
            req.body.equipo_id,
            req.body.fecha_prestamo, 
            req.body.fecha_devolucion_prevista, 
            req.body.fecha_devolucion_real, 
            req.body.estado, 
            req.body.notas]);
    res.json({
        id: results.resultId,
        ...req.body
    });

}
export const deleteLoan = async (req, res) =>{
    const connection = await connect();
    const result = await connection.query("DELETE FROM Prestamos WHERE prestamo_id = ?", [req.params.id]);
    console.log(result);
    res.json({
        message: 'Prestamo eliminado'
    });
}

export const updateLoan = async (req, res) =>{
   const connection = await connect();
   const results = await connection.query("UPDATE prestamos SET ? WHERE prestamo_id = ?",
        [req.body, 
            req.params.id]);
    console.log(results);
    res.json({
        message: 'Prestamo actualizado'
    });
}