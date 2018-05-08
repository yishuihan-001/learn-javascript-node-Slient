'use strict';

const fs = require('fs');

console.log('---START---');

var data = fs.readFileSync('sample.txt', 'utf-8');

console.log(data);

console.log('---END---');




