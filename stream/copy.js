'use strict';

const fs = require('fs');

var rs = fs.createReadStream('output1.txt');

var ws = fs.createWriteStream('copy.txt');

rs.pipe(ws);






