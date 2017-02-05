/// <reference path='../typings/index.d.ts' />
"use strict";
var chai_1 = require("chai");
var router_1 = require("../lib/router");
describe('Router', function () {
    it('match path for string pattern', function () {
        var window = {};
        var router = new router_1.Router(window);
        var called = false;
        router.hash('foo/bar', function () {
            called = true;
        });
        router.dispatch('foo/bar');
        chai_1.assert.equal(true, called);
    });
    it('match path for argumented pattern', function () {
        var window = {};
        var router = new router_1.Router(window);
        var called = false;
        var id;
        router.hash('foo/:id', function (_id) {
            called = true;
            id = _id;
        });
        router.dispatch('foo/0');
        chai_1.assert.equal(true, called);
        chai_1.assert.equal(0, id);
    });
    it('start router', function () {
        var window = {
            location: {
                hash: ''
            }
        };
        var router = new router_1.Router(window);
        var called = false;
        window.addEventListener = function () {
            called = true;
        };
        router.start();
        chai_1.assert.equal(true, called);
    });
    it('start router when hash provided', function () {
        var window = {
            location: {
                hash: '#0'
            }
        };
        var router = new router_1.Router(window);
        var called = false;
        window.addEventListener = function () {
            called = true;
        };
        router.start();
        chai_1.assert.equal(true, called);
    });
    it('stop router', function () {
        var window = {
            location: {
                hash: ''
            }
        };
        var router = new router_1.Router(window);
        var called = false;
        window.removeEventListener = function () {
            called = true;
        };
        router.stop();
        chai_1.assert.equal(true, called);
    });
});
