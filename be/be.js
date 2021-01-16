require('./tracing');
const {get, put} = require('./db');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router()

router.get('/items', async (ctx, next) => {
  ctx.body = JSON.stringify(await get());
  ctx.set('Content-Type', 'application/json')
});

router.post('/items', async (ctx, next) => {
  result = []
  for (var key in ctx.request.body) {
    if (ctx.request.body.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
      result += await put(key, ctx.request.body[key])
    }
  }
  ctx.body = JSON.stringify(result)
  ctx.set('Content-Type', 'application/json')
});

app
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message
      };
    }
  })
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000);
