'use strict';
console.log('\n');

const crypto = require('crypto'),
      hash = crypto.createHash('md5');

hash.update('Slient !');

var r = hash.digest('hex');

console.log(`md5 hash is :  ${r}`)







console.log('\n');