"use strict";
var pathToRegexp = require("path-to-regexp");
var Router = (function () {
    // private hashCurrent() : string {
    // 	return hashpath()
    // }
    // private hashPrevious() : string {
    // 	return this.previous
    // }
    // private hashRoutes() : Route[] {
    // 	return this.routes
    // }
    function Router(window) {
        this.routes = [];
        this.window = window;
    }
    Router.prototype.hash = function (path, callback) {
        //if (path === undefined) throw new TypeError('invalid argument arg[1:path]')
        //if (arg === undefined) throw new TypeError('invalid argument arg[2:arg]')
        var keys = [];
        var re = pathToRegexp(path, keys);
        var route = { re: re, keys: keys, callback: callback };
        this.routes.push(route);
    };
    Router.prototype.hashpath = function () {
        // cut prefix '#'
        return this.window.location.hash.slice(1);
    };
    Router.prototype.start = function () {
        this.window.addEventListener('hashchange', this.onHashChanged, false);
        var hash = this.hashpath();
        if (hash.length > 0) {
            this.dispatch(hash);
        }
    };
    Router.prototype.stop = function () {
        this.window.removeEventListener('hashchange', this.onHashChanged, false);
    };
    Router.prototype.onHashChanged = function () {
        this.dispatch(this.hashpath());
    };
    Router.prototype.dispatch = function (path) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNkNBQThDO0FBUTlDO0lBT0MsbUNBQW1DO0lBQ25DLHFCQUFxQjtJQUNyQixJQUFJO0lBRUosb0NBQW9DO0lBQ3BDLHdCQUF3QjtJQUN4QixJQUFJO0lBRUosbUNBQW1DO0lBQ25DLHNCQUFzQjtJQUN0QixJQUFJO0lBRUosZ0JBQVksTUFBZTtRQWRuQixXQUFNLEdBQXNCLEVBQUUsQ0FBQTtRQWVyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUNyQixDQUFDO0lBRUQscUJBQUksR0FBSixVQUFLLElBQWEsRUFBRSxRQUFxQjtRQUN4Qyw2RUFBNkU7UUFDN0UsMkVBQTJFO1FBRTNFLElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQTtRQUN2QixJQUFNLEVBQUUsR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRW5DLElBQU0sS0FBSyxHQUFXLEVBQUMsRUFBRSxJQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUMsQ0FBQTtRQUUxQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBRUQseUJBQVEsR0FBUjtRQUNDLGlCQUFpQjtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRUQsc0JBQUssR0FBTDtRQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFFckUsSUFBTSxJQUFJLEdBQVksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3BCLENBQUM7SUFDRixDQUFDO0lBRUQscUJBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDekUsQ0FBQztJQUVPLDhCQUFhLEdBQXJCO1FBQ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQseUJBQVEsR0FBUixVQUFTLElBQWE7UUFDckIsR0FBRyxDQUFDLENBQWMsVUFBVyxFQUFYLEtBQUEsSUFBSSxDQUFDLE1BQU0sRUFBWCxjQUFXLEVBQVgsSUFBVztZQUF4QixJQUFJLEtBQUssU0FBQTtZQUNiLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDM0MsS0FBSyxDQUFBO1lBQ04sQ0FBQztTQUNEO0lBQ0YsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBcEVELElBb0VDO0FBcEVZLHdCQUFNIn0=