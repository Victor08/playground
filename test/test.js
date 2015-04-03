var assert = require("assert"); // node.js core module
var C = require('../mocha/cash.js');

describe('Cash Register', function(){
    describe('Module C', function(){
        it('should have a getChange Method', function(){
            assert.equal(typeof C, 'object');
            assert.equal(typeof C.getChange, 'function');
        })
    })
});