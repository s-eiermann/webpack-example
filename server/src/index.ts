import express from 'express'
// eslint-disable-next-line no-duplicate-imports
import type { Express } from 'express'
import winston from 'winston'
import expressWinston from 'express-winston'
import path from 'path'
import { fileURLToPath } from 'url'

import { initRoutes } from './routes.js'
import { Config } from './model.js'
import c from './config.json' assert { type: 'json' }
const config = c as unknown as Config
console.log('Starting server...')

const app: Express = express()
const port = process.env.PORT ?? 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientPath = path.join(__dirname, '../../client')

// Server Config
app.set('view engine', 'ejs')
app.set('views', path.join(clientPath, 'views'))
app.disable('x-powered-by')
app.use(expressWinston.logger({
  transports: [new winston.transports.Console()]
}))

initRoutes(app, clientPath, config)

// Start server.
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
