import {connect} from '../database'


export const getReservations = async(req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECt * FROM reservas_laboratorio");
    res.json(rows);
}
export const getBooking = async (req, res) => {
       const connection = await connect();
       const [rows] = await connection.query("SELECT * FROM reservas_laboratorio WHERE reserva_id = ?", [req.params.id]);
    res.json(rows[0]);
}
export const getBookingCount = async (req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECT COUNT(*) FROM reservas_laboratorio");
    res.json(rows[0]['COUNT(*)']);
}
export const saveBooking = async (req, res) =>{
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO reservas_laboratorio (laboratorio_id, usuario_id, fecha_inicio, fecha_fin, proposito, estado) VALUES (?, ?, ?, ?, ?, ?)", 
        [req.body.laboratorio_id, 
            req.body.usuario_id, 
            req.body.fecha_inicio, 
            req.body.fecha_fin, 
            req.body.proposito,
            req.body.estado]);  
    res.json({
        id: results.resultId,
        ...req.body
    });

}
export const deleteBooking = async (req, res) =>{
    const connection = await connect();
    const result = await connection.query("DELETE FROM reserva_laboratorio WHERE reserva_id = ?", [req.params.id]);
    console.log(result);
    res.json({
        message: 'Reserva eliminado'
    });
}

export const updateBooking = async (req, res) =>{
   const connection = await connect();
   const results = await connection.query("UPDATE reservas_laboratorio SET ? WHERE reserva_id = ?",
        [req.body, 
            req.params.id]);
    console.log(results);
    res.json({
        message: 'Reservas actualizado'
    });
}

