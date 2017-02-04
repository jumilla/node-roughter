/// <reference path='../typings/index.d.ts' />
"use strict";
var chai_1 = require("chai");
var dispatcher_1 = require("../src/dispatcher");
describe('Dispatcher', function () {
    it('ほげ', function () {
        var dispatcher = new dispatcher_1.Dispatcher();
        chai_1.assert.notEqual(null, dispatcher);
    });
});
