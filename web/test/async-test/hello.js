console.log('init hello.js ...');

const fs = require('mz/fs');

var fn = async () => {
    let expression = await fs.readFile('./data.txt', 'utf-8');
    let fn = new Function('return ' + expression);
    let r = fn();
    console.log(`Caculate: ${expression} = ${r}`);
    return r;
};

module.exports = fn;
