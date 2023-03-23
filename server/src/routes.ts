import { generateSitemap } from './util.js'
import path from 'path'
import express, { Response } from 'express'
// eslint-disable-next-line no-duplicate-imports
import type { Express } from 'express'
import { readFileSync } from 'fs'
import { Config } from './model'

const uuid = process.env.NODE_ENV === 'production'
  ? readFileSync('server/dist/uuid.config', 'utf8') : 'dev'
const baseOptions = {
  uuid,
  jsType: process.env.NODE_ENV === 'production' ? '.min' : ''
}

console.log('baseOptions: ' + JSON.stringify(baseOptions, null, 2))
const render = (res: Response, route: string, obj: object) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    res.render(route, obj, (err: undefined | Error, html) => {
      if (err) res.redirect('/')
      else res.send(html)
    })
  } else {
    res.render(route, obj)
  }
}

export const initRoutes = (
  app: Express,
  clientPath: string,
  config: Config
) => {
  // Landing Page
  app.get('/', (_, res) => render(res, 'index', baseOptions))

  // Robots.txt
  app.use('/robots.txt', (_, res) => {
    res.type('text/plain')
    res.send(`User-agent: *\nDisallow:\nSitemap: ${config.url}/sitemap.xml\n`)
  })

  // Sitemap
  app.use('/sitemap.xml', (_, res) => {
    res.type('application/xml')
    res.send(generateSitemap(app, config))
  })

  // Static Content
  app.use('/', express.static(path.join(clientPath, 'public'), {
    maxAge: '365d',
  }))
  app.use('/', express.static(path.join(clientPath, 'dist'), {
    maxAge: '365d',
  }))

  // Catch All
  app.get('*', (_, res) => res.redirect(301, '/'))
}
