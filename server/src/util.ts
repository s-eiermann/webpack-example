import { Config } from './model.js'
import type { Express } from 'express'

interface ExpressRouter {
  stack: [{ route: { path: string | undefined } | undefined }]
}
export const generateSitemap = (app: Express, config: Config): string => {
  const bar = app._router as ExpressRouter
  let result: string = '<?xml version="1.0" encoding="UTF-8"?>'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
    + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
    + 'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 '
    + 'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'
    + '<url>\n'

  const urls = new Set()
  for (const routes of bar.stack) {
    if (routes.route?.path) {
      const p = routes.route.path
      if (
        p !== '*'
        && !p.endsWith('.json')
        && !p.endsWith('.csv')
      ) {
        urls.add(`<loc>${config.url}${p}</loc>`)
      }
    }
  }

  result += `${Array.from(urls).join('\n')}</url></urlset>`
  return result
}
