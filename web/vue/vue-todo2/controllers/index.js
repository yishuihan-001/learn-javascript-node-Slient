var exportObj = {
    'GET /': async (ctx, next) => {
        ctx.response.redirect('/static/index.html');
    }
};


module.exports = exportObj;

