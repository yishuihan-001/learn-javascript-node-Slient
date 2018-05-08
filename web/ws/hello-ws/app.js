const WebSocket = require('ws'),
      WebSocketServer = WebSocket.Server,
      wss = new WebSocketServer({
        port: 3000
      });

wss.on('connection', function(ws){
    console.log(`[SERVER] connection()`);
    ws.on('message', function(message){
        console.log(`[SERVER] Recevied: ${message}`);
        setTimeout(() => {
            ws.send('What is your name ?', (err) => {
                if(err){
                    console.log(`[SERVER] error: ${err}`);
                }
            });
        }, 3000);
    });
});

console.log('ws server started at port 3000...');

/*
// 打开一个WebSocket:
var ws = new WebSocket('ws://localhost:3000/test');
// 响应onmessage事件:
ws.onmessage = function(msg) { console.log(msg); };
// 给服务器发送一个字符串:
ws.send('Hello!');
// 注意:之所以数据不能发送出去，是因为websocket还处在“CONNECTING”状态下，连接还没有成功。
*/


// client test;

/* let ws = new WebSocket('ws://localhost:3000/test');
ws.on('open', function(){
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});
ws.on('message', function(message){
    console.log(`[CLIENT] Received: ${message}`);
}); */


let count = 0;

let ws = new WebSocket('ws://localhost:3000/ws/chat');

ws.on('open', function () {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
    count++;
    if (count > 3) {
        ws.send('Goodbye!');
        ws.close();
    } else {
        setTimeout(() => {
            ws.send(`Hello, I'm Mr No.${count}!`);
        }, 1000);
    }
});




