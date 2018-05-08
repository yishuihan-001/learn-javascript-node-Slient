const Koa = require('koa'),
      app = new Koa();

app.use(async (ctx, next) => {
    // if(ctx.request.url == '/favicon.ico') return;
    var start = new Date().getTime();
    console.log('---1---');
    await next();
    console.log('---2---');
    var ms = new Date().getTime() - start;
    console.log(`${ctx.request.method} ${ctx.request.url} : ${ms}ms`);
    ctx.response.set('X-Response-time', `${ms}ms`);
});

app.use(async (ctx, next) => {
    // if(ctx.request.url == '/favicon.ico') return;
    console.log('---3---')
    await next();
    console.log('---4---')
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Slient !</h1>'
});

app.listen(3000);

console.log('\n Start');







