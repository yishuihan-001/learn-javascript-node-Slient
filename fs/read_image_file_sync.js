'use strict';

const fs = require('fs');

console.log('---start---')

var data = fs.readFileSync('sample.png');
console.log(data);
console.log(data.length + ' bytes');

console.log('---end---');
