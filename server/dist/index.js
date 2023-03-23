import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import { fileURLToPath } from 'url';
import { initRoutes } from './routes.js';
import c from './config.json' assert { type: 'json' };
const config = c;
console.log('Starting server...');
const app = express();
const port = process.env.PORT ?? 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, '../../client');
// Server Config
app.set('view engine', 'ejs');
app.set('views', path.join(clientPath, 'views'));
app.disable('x-powered-by');
app.use(expressWinston.logger({
    transports: [new winston.transports.Console()]
}));
initRoutes(app, clientPath, config);
// Start server.
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
//# sourceMappingURL=index.js.map