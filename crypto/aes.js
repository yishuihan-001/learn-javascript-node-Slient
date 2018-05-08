'use strict';
console.log('\n');

const crypto = require('crypto');

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(data, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is Slient !';
var key = 'YSP';

var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log(data);
console.log('Text encrypted: ' + encrypted);
console.log('Text decrypted: ' + decrypted);










console.log('\n');