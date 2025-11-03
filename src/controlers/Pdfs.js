import buildPDF from "../libs/pdfkit";

export const pdfEstudiante = (req, res) => {
    const stream = res.writeHead(200, {
        "content-type": "application/pdf",
        "content-disposition": "attachment; filename=estudiante.pdf",

    });

    buildPDF((data) => 
        stream.write(data), () => stream.end());
  
}