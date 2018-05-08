'use strict';

const fs = require('fs');

console.log('--start---');

var data = 'hello, world!';

fs.writeFileSync('output.txt', data);







console.log('---end---');
