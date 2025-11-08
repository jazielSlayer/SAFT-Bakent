
const fs = require('node:fs');

export const SubirImagenes =  (req, res) => {
    console.log(req.file);
    SaveImage(req.file)
    res.send('Subido puto')
}
export const MultipleArchivos = (req, res) => {
    console.log(req.files)
    req.files.map(SaveImage);
    res.send('Archivos subidos exitosamente')
}

function SaveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath)
    return newPath;
}