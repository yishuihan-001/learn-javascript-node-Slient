'use strict';

const http = require('http');

var server = http.createServer(function(req, res){
    if(req.url == '/favicon.ico'){
        return;
    }
    console.log(req.method + ' : ' + req.url);
    res.writeHead(200, {'Contetn-Type': 'text/html'});
    res.end('<h1>Slient !</h1>');
});

server.listen(8080);




