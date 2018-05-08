'use strict';

const fs = require('fs');

console.log('---start---')

var data = 'Slient, Come on !';

fs.writeFile('output.txt', data, function(err, data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});






console.log('---end---');
