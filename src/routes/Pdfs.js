import { Router } from "express"; 
import { pdfEstudiante, pdfAdmin, pdfDocenteGuia, pdfDocenteRevisor } from "../controlers/Pdfs";


const router = Router();
// ruta para pdfs de estudiante
router.get("/pdfEstudiante", pdfEstudiante);

//Admin pdf
router.get("/pdfAdmin", pdfAdmin);
router.get("/pdfDocenteGuia", pdfDocenteGuia);
router.get("/pdfDocenteRevisor", pdfDocenteRevisor);
export default router;