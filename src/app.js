import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './swaggerOptions';
const specs = swaggerJSDoc(options);

import userRoutes from './routes/user';
import laboratorioRoutes from './routes/laboratorio';
import prestamoRoutes from './routes/prestamo';
import categoria_equipoRoutes from './routes/categoria_equipo';
import equipoRoutes from './routes/equipo';
import reserva_laboratorioRoutes from './routes/reserva_laboratorio';
import mantenimientosRoutes from './routes/mantenimiento';

const app = express();

app.use(cors());
app.use(morgan('dev'));


app.use(express.json());
app.use(userRoutes);
app.use(laboratorioRoutes);
app.use(prestamoRoutes);
app.use(categoria_equipoRoutes);
app.use(equipoRoutes);
app.use(reserva_laboratorioRoutes);
app.use(mantenimientosRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

export default app;