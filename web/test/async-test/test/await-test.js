const assert = require('assert'),
      hello = require('../hello');

describe('#async hello.js', () => {
    describe('#asyncCalculate()', () => {
        it('#async with done', (done) => {
            (async function(){
                try {
                    let r = await hello();
                    assert.strictEqual(r, 15);
                    done();
                } catch (err) {
                    done(err);
                }
            })();
        });

        it('#async function', async () => {
            let r = await hello();
            assert.strictEqual(r, 15);
        });

        it('#async function', () => {
            assert(true);
        });

    });
});








