/**
 * Created by nova on 2017/5/18.
 */
'use strict';

import Koa from 'koa';
import router from './routers/index';
import koaBody from 'koa-body';
import errorHandle from './middlewares/errorHandle';
var cors = require('koa2-cors');
const app = new Koa();

// app.use(async function (ctx, next) {
//     ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin)
//     ctx.set("Access-Control-Allow-Credentials", true);
//     ctx.set("Access-Control-Max-Age", 86400000);
//     ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
//     ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
//     await next()
// });
app.use(cors());
app.use(errorHandle);
app.use(koaBody({multipart: true,strict:false}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5001, function () {
    console.log('listening on port %s in %s', 5001, process.env.NODE_ENV);
});