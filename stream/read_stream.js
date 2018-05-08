'use strict';

const fs = require('fs');

console.log('---START---');

var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function(chunk){
    console.log('ing......');
    console.log(chunk);
});

rs.on('end', function(){
    console.log('---end---')
});

rs.on('error', function(err){
    console.log('***error***');
    console.log(err);
});

console.log('---END---');
