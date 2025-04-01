import {connect} from '../database'


export const getCategories = async(req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECt * FROM categorias_equipos");
    res.json(rows);
}
export const getCategory = async (req, res) => {
       const connection = await connect();
       const [rows] = await connection.query("SELECT * FROM categorias_equipos WHERE categoria_id = ?", [req.params.id]);
    res.json(rows[0]);
}
export const getCategoryCount = async (req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECT COUNT(*) FROM categorias_equipos");
    res.json(rows[0]['COUNT(*)']);
}
export const saveCategory = async (req, res) =>{
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO categorias_equipos (nombre, descripcion) VALUES (?, ?)", 
        [req.body.nombre, 
            req.body.descripcion]);  
    res.json({
        id: results.resultId,
        ...req.body
    });

}
export const deleteCategory = async (req, res) =>{
    const connection = await connect();
    const result = await connection.query("DELETE FROM categorias_equipos WHERE categoria_id = ?", [req.params.id]);
    console.log(result);
    res.json({
        message: 'Categoria eliminado'
    });
}

export const updateCategory = async (req, res) =>{
   const connection = await connect();
   const results = await connection.query("UPDATE categorias_equipos SET ? WHERE categoria_id = ?",
        [req.body, 
            req.params.id]);
    console.log(results);
    res.json({
        message: 'categoria actualizado'
    });
}

