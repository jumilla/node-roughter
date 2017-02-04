"use strict";
var pathToRegexp = require("path-to-regexp");
function hashpath() {
    // cut prefix '#'
    return window.location.hash.slice(1);
}
var Router = (function () {
    function Router() {
        this.routes = [];
    }
    // private hashCurrent() : string {
    // 	return hashpath()
    // }
    // private hashPrevious() : string {
    // 	return this.previous
    // }
    // private hashRoutes() : Route[] {
    // 	return this.routes
    // }
    Router.prototype.hash = function (path, arg) {
        //if (path === undefined) throw new TypeError('invalid argument arg[1:path]')
        //if (arg === undefined) throw new TypeError('invalid argument arg[2:arg]')
        var keys = [];
        var re = pathToRegexp(path, keys);
        var route = { re: re, keys: keys };
        if (typeof arg === 'function') {
            route.callback = arg;
        }
        else {
            route.callback = function () {
                // TODO
                //riot.route(arg)
            };
        }
        this.routes.push(route);
    };
    Router.prototype.dispatch = function (path) {
        if (!path) {
            path = hashpath();
        }
        else {
        }
        for (var _i = 0, _a = this.routes; _i < _a.length; _i++) {
            var route = _a[_i];
            var result = route.re.exec(path);
            if (result) {
                route.callback.apply(this, result.slice(1));
                break;
            }
        }
    };
    return Router;
}());
exports.Router = Router;
exports.router = new Router();
