var fn_signin = async (ctx, next) => {
    var email = ctx.request.body.email || '',
        password = ctx.request.body.password;
    if(email === 'admin@example.com' && password == '123456'){
        console.log('signin ok !');
        ctx.render('signin-ok.html', {
            title: 'Sign OK !',
            name: 'Slient'
        });
    }else{
        console.log('signin fail !');
        ctx.render('signin-failed.html', {
            title: 'You are failed !'
        });
    }
};

module.exports = {
    'POST /signin': fn_signin
};
