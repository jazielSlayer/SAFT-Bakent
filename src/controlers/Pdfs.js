import {buildPDFEstudiante, buildPDFAdmin, buildPDFDocenteGuia, buildPDFDocenteRevisor} from "../libs/pdfkit";

export const pdfEstudiante = (req, res) => {
    const stream = res.writeHead(200, {
        "content-type": "application/pdf",
        "content-disposition": "attachment; filename=estudiante.pdf",

    });

    buildPDFEstudiante((data) => 
        stream.write(data), () => stream.end());
}

export const pdfAdmin = (req, res) => {
    const stream = res.writeHead(200, {
        "content-type": "application/pdf",
        "content-disposition": "attachment; filename=admin.pdf",

    });

    buildPDFAdmin((data) => 
        stream.write(data), () => stream.end());
}

export const pdfDocenteGuia = (req, res) => {
    const stream = res.writeHead(200, {
        "content-type": "application/pdf",
        "content-disposition": "attachment; filename=docenteguia.pdf",

    });

    buildPDFDocenteGuia((data) => 
        stream.write(data), () => stream.end());
}

export const pdfDocenteRevisor = (req, res) => {
    const stream = res.writeHead(200, {
        "content-type": "application/pdf",
        "content-disposition": "attachment; filename=docenterevisor.pdf",

    });

    buildPDFDocenteRevisor((data) => 
        stream.write(data), () => stream.end());
}
