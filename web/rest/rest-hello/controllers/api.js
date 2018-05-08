var products = [
    {
        name: '张三',
        sex: 'male'
    },{
        name: '李四',
        sex: 'female'
    }
];

var apiCollect = {
    'GET /api/products': async (ctx, next) => {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            products: products
        };
    },
    'POST /api/products': async (ctx, next) => {
        var p = {
            name: ctx.request.body.name,
            sex: ctx.request.body.sex
        };
        products.push(p);
        ctx.response.type = 'application/json';
        ctx.response.body = p;
    }
};


module.exports = apiCollect;





