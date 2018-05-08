'use strict';
console.log('\n');

const crypto = require('crypto'),
      hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Slient !');

var r = hmac.digest('hex');

console.log(`hmac is : ${r}`)












console.log('\n');