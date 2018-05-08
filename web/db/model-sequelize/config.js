const defaultConfig = './config-default.js',
      overrideConfig = './config-override.js',
      testConfig = './config-test.js',
      fs = require('fs');

var config = null;

if(process.env.NODE_ENV === 'test' || process.env.NODE_ENV == undefined){
    console.log(`load ${testConfig}`);
    config = require(testConfig);
}else{
    console.log(`load ${defaultConfig}`);
    config = require(defaultConfig);
    try {
        if(fs.statSync(overrideConfig).isFile()){
            console.log(`load ${overrideConfig}`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (error) {
        console.log(`cannot load ${overrideConfig}`);
    }
}

module.exports = config;




