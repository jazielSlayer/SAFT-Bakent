import { Router} from "express";
import { sendAuthCode, verifyAuthCode } from "../controlers/Autenticacion";

const router = Router();
/**
 * @swagger
 * /api/send-auth-code:
 * post:
 *  summary: Enviar código de autenticación por correo
 *  tags: [Authentication]
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *              type: string
 *  responses:
 *    200:
 *      description: Código enviado exitosamente
 *    400:
 *      description: Correo requerido
 *    404:
 *      description: Correo no registrado
 *    500:
 *      description: Error al enviar el código
 */
router.post("/api/send-auth-code", sendAuthCode);

/**
 * @swagger
 * /api/verify-auth-code:
 * post:
 *  summary: Verificar código de autenticación
 *  tags: [Authentication]
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - code
 *          properties:
 *            email:
 *              type: string
 *            code:
 *              type: string
 *  responses:
 *    200:
 *      description: Código verificado exitosamente
 *    400:
 *      description: Correo o código inválidos
 *    500:
 *      description: Error al verificar el código
 */
router.post("/api/verify-auth-code", verifyAuthCode);

export default router;