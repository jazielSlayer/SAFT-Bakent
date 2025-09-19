import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './swaggerOptions';

const specs = swaggerJSDoc(options);

import userRoutes from './routes/user';
import avanceEstudianteRoutes from './routes/avance_estudiante';
import docenteRoutes from './routes/docente';
import estudianteRoutes from './routes/estudiante';
import historialAuditoriaRoutes from './routes/historial_auditoria';
import metodologiaRoutes from './routes/metodologia';
import moduloRoutes from './routes/modulo';
import observacionRoutes from './routes/observacion';
import pagoRoutes from './routes/pago';
import personaRoutes from './routes/persona';
import programaAcademicoRoutes from './routes/programa_academico';
import proyectoRoutes from './routes/proyecto';
import tallerRoutes from './routes/taller';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(userRoutes);
app.use(avanceEstudianteRoutes);
app.use(docenteRoutes);
app.use(estudianteRoutes);
app.use(historialAuditoriaRoutes);
app.use(metodologiaRoutes);
app.use(moduloRoutes);
app.use(observacionRoutes);
app.use(pagoRoutes);
app.use(personaRoutes);
app.use(programaAcademicoRoutes);
app.use(proyectoRoutes);
app.use(tallerRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

export default app;