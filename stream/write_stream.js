'use strict';

const fs = require('fs');

var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('一 \n');
ws1.write('二 \n');
ws1.write('三 \n');
ws1.end();


var ws2 = fs.createWriteStream('output2.txt');
ws2.write(new Buffer('使用Stream写入yi进制数据... \n', 'utf-8'));
ws2.write(new Buffer('使用Stream写入er进制数据... \n', 'utf-8'));
ws2.write(new Buffer('使用Stream写入san进制数据... \n', 'utf-8'));
ws2.end();











