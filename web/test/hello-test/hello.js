console.log('init hello.js ...');

function hello(...rest){
    var sum = 0;
    for(let n of rest){
        sum += n;
    }
    return sum;
}

module.exports = hello;




