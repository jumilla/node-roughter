/// <reference path='../typings/index.d.ts' />
"use strict";
var chai_1 = require("chai");
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            chai_1.assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});
