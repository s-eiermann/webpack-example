import { generateSitemap } from './util.js';
import path from 'path';
import express from 'express';
import { readFileSync } from 'fs';
const uuid = process.env.NODE_ENV === 'production'
    ? readFileSync('server/dist/uuid.config', 'utf8') : 'dev';
const baseOptions = {
    uuid,
    jsType: process.env.NODE_ENV === 'production' ? '.min' : ''
};
console.log('baseOptions: ' + JSON.stringify(baseOptions, null, 2));
const render = (res, route, obj) => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
        res.render(route, obj, (err, html) => {
            if (err)
                res.redirect('/');
            else
                res.send(html);
        });
    }
    else {
        res.render(route, obj);
    }
};
export const initRoutes = (app, clientPath, config) => {
    // Landing Page
    app.get('/', (_, res) => render(res, 'index', baseOptions));
    // Robots.txt
    app.use('/robots.txt', (_, res) => {
        res.type('text/plain');
        res.send(`User-agent: *\nDisallow:\nSitemap: ${config.url}/sitemap.xml\n`);
    });
    // Sitemap
    app.use('/sitemap.xml', (_, res) => {
        res.type('application/xml');
        res.send(generateSitemap(app, config));
    });
    // Static Content
    app.use('/', express.static(path.join(clientPath, 'public'), {
        maxAge: '365d',
    }));
    app.use('/', express.static(path.join(clientPath, 'dist'), {
        maxAge: '365d',
    }));
    // Catch All
    app.get('*', (_, res) => res.redirect(301, '/'));
};
//# sourceMappingURL=routes.js.map