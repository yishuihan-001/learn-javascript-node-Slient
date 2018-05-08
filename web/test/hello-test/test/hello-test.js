const assert = require('assert'),
      sum = require('../hello');

describe('#hello.js', () => {
    describe('#sum()', () => {
        before(function(){
            console.log('before');
        });

        after(function(){
            console.log('after');
        });

        beforeEach(function(){
            console.log('beforeEach---');
        });

        afterEach(function(){
            console.log('afterEach***');
        });

        it('sum() should return 0', () => {
            assert.strictEqual(sum(), 0);
        });

        it('sum(2) should return 2', () => {
            assert.strictEqual(sum(2), 2);
        });
    });
});








