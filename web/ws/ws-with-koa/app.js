const Koa = require('koa'),
      bodyParser = require('koa-bodyparser'),
      controller = require('./controller'),
      templating = require('./templating'),
      url =  require('url'),
      ws = require('ws'),
      Cookies = require('cookies'),
      WebSocketServer = ws.Server,
      app = new Koa();
     
const isProduction = process.env.NODE_ENV === 'production';

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} : ${ctx.request.url} ...`);
    await next();
});

app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});

if(!isProduction){
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static/'));
}

app.use(bodyParser());

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(controller());

var server = app.listen(3000);

function parseUser(obj){
    if(!obj){
        return;
    }
    console.log('try parse: ' + obj);
    let s = '';
    if(typeof obj === 'string'){
        s = obj;
        console.log('---------');
        console.log(s);
    }else if(obj.headers){
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
        console.log('*********');
        console.log(cookies);
        console.log(s);
    }
    if(s){
        try{
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        }catch(e){

        }
    }
}

function createWebSocketServer(server, onConnection, onMessage, onClose, onError){
    let wss = new WebSocketServer({
        server: server
    });
    wss.broadcast = function broadcast(data){
        wss.clients.forEach(function each(client){
            client.send(data);
        });
    };
    onConnection = onConnection || function () {
        console.log('[WebSocket] connected.');
    };
    onMessage = onMessage || function (msg) {
        console.log('[WebSocket] message received: ' + msg);
    };
    onClose = onClose || function (code, message) {
        console.log(`[WebSocket] closed: ${code} - ${message}`);
    };
    onError = onError || function (err) {
        console.log('[WebSocket] error: ' + err);
    };
    wss.on('connection', function(ws){
        console.log(ws.upgradeReq);
        let location = url.parse(ws.upgradeReq.url, true);
        console.log('[WebSocketServer] connection: ' + location.href);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        if(location.pathname !== '/ws/chat'){
            ws.close(4000, 'Invalid URL');
        }
        let user = parseUser(ws.upgradeReq);
        if(!user){
            ws.close(4001, 'Invalid user');
        }
        ws.user = user;
        ws.wss = wss;
        onConnection.apply(ws);
        return wss;
    });
}

var messageIndex = 0;

function createMessage(type, user, data){
    messageIndex++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

function onConnect(){
    let user = this.user;
    let msg = createMessage('join', user, `${user.name} joined.`);
    this.wss.broadcast(msg);
    let users = this.wss.clients.map(function(client){
        return client.user;
    });
    this.send(createMessage('list', user, users));
}

function onMessage(message){
    console.log(message);
    if(message && message.trim()){
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}

function onClose(){
    let user = this.user;
    let msg = createMessage('left', user, `${user.name} is left.`);
    this.wss.broadcast(msg);
}

app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);


console.log('app started at port 3000...');






