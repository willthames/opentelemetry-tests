require('./tracing');
const Koa = require('koa');
const Router = require('@koa/router');
const fetch = require('node-fetch');
const axios = require('axios');

const app = new Koa();
const router = new Router();

router.get('/fetch', async (ctx, next) => {
  const response = await fetch('http://be:4000/items');
  ctx.body = await response.json();
  ctx.status = response.status;
});

router.get('/axios', async (ctx, next) => {
  try {
    const response = await axios.get('http://be:4000/items');
    ctx.body = response.data;
    ctx.status= response.status;
  } catch (error) {
    ctx.body = error.response.data;
    ctx.status= error.response.status;
  }
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
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
