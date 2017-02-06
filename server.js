const webpack = require('webpack');
const webpackMiddleware = require('koa-webpack');
const config = require('./webpack.config');
const app = new (require('koa'))();
const compiler = webpack(config);
const fs = require('fs');
const serve = require('koa-static');
const convert = require('koa-convert');
const router = require('koa-router')();
const path = require('path');

router
    .get("/", ctx => {
        ctx.body = fs.createReadStream( path.join( __dirname, 'index.html' ) )
});

app
    .use(webpackMiddleware({
        compiler: compiler,
        config: config,
        dev:{
            noInfo: true,
            publicPath: config.output.publicPath
        }
    }))
    .use(convert(serve('.')))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);

