import { Router } from "express";
import { pdfEstudiante, pdfAdmin, pdfDocenteGuia, pdfDocenteRevisor } from "../controlers/Pdfs";

const router = Router();

router.get("/pdf/estudiante/:id", pdfEstudiante);
router.get("/pdf/docente-guia/:id", pdfDocenteGuia);
router.get("/pdf/docente-revisor/:id", pdfDocenteRevisor);
router.get("/pdf/admin", pdfAdmin);

export default router;