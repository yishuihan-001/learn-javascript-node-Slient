'use strict';

const fs = require('fs');

console.log('---START---');

fs.readFile('sample.txt', 'utf-8', function(err, data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

console.log('---END---');






