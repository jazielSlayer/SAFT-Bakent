import { Router } from "express"; 
import { pdfEstudiante } from "../controlers/Pdfs";


const router = Router();
// ruta para pdfs de estudiante
router.get("/pdfEstudiante", pdfEstudiante);
export default router;