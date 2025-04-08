import app from './app';
import './database';

const port = process.env.DB_PORT || 3000;
app.listen(port);
console.log('Server on port', port);