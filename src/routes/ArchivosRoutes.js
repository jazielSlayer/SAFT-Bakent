import { Router } from "express"; 
import {  MultipleArchivos, SubirImagenes  } from "../controlers/Archivos";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.post("/imagen/",upload.single('imagenPerfil'), SubirImagenes )
router.post("/multiple/archivos", upload.array('archivos', 20), MultipleArchivos)
export default router