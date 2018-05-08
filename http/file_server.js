'use strict';
console.log('\n');

const fs = require('fs'),
      url = require('url'),
      path = require('path'),
      http = require('http');

var root = path.resolve(process.argv[2] || '.');

console.log(root);

var server = http.createServer(function(req, res){
    if(req.url == '/favicon.ico'){
        return;
    }
    console.log('__dirname: ' + __dirname);
    console.log('__filename: ' + __filename);
    var pathname = url.parse(req.url).pathname,
        filepath = path.join(root, pathname);
        console.log('pathname: ' + pathname);
        console.log('filepath: ' + filepath);
    fs.stat(filepath, function(err, stats){
        if(!err && stats.isFile()){
            console.log('200: ' + req.url);
            res.writeHead(200);
            fs.createReadStream(filepath).pipe(res);
        }else{
            console.log('404: ' + req.url);
            res.writeHead(404);
            res.end('404 Not Found !')
        }
    });
});

server.listen(8080);


