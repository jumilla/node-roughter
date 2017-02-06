"use strict";
var pathToRegexp = require("path-to-regexp");
var Router = (function () {
    function Router(window) {
        this.routes = [];
        this.onHashChanged = null;
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
        var path = this.window.location.hash.slice(1);
        // cut prefix '/'
        if (path.lastIndexOf('/', 0) === 0) {
            path = path.slice(1);
        }
        return path;
    };
    Router.prototype.start = function () {
        var _this = this;
        if (!this.onHashChanged) {
            this.onHashChanged = function (event) {
                _this.dispatch(_this.hashpath());
            };
            this.window.addEventListener('hashchange', this.onHashChanged, false);
            this.dispatch(this.hashpath());
        }
    };
    Router.prototype.stop = function () {
        if (this.onHashChanged) {
            this.window.removeEventListener('hashchange', this.onHashChanged, false);
            this.onHashChanged = null;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNkNBQThDO0FBUTlDO0lBT0MsZ0JBQVksTUFBZTtRQUpuQixXQUFNLEdBQXNCLEVBQUUsQ0FBQTtRQUU5QixrQkFBYSxHQUFtQyxJQUFJLENBQUE7UUFHM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDckIsQ0FBQztJQUVELHFCQUFJLEdBQUosVUFBSyxJQUFhLEVBQUUsUUFBb0M7UUFDdkQsNkVBQTZFO1FBQzdFLDJFQUEyRTtRQUUzRSxJQUFJLElBQUksR0FBYSxFQUFFLENBQUE7UUFDdkIsSUFBTSxFQUFFLEdBQUcsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUVuQyxJQUFNLEtBQUssR0FBVyxFQUFDLEVBQUUsSUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFDLENBQUE7UUFFMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVELHlCQUFRLEdBQVI7UUFDQyxpQkFBaUI7UUFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUU3QyxpQkFBaUI7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyQixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNaLENBQUM7SUFFRCxzQkFBSyxHQUFMO1FBQUEsaUJBVUM7UUFUQSxFQUFFLENBQUMsQ0FBQyxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQSxLQUFLO2dCQUN6QixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1lBQy9CLENBQUMsQ0FBQTtZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFFckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUMvQixDQUFDO0lBQ0YsQ0FBQztJQUVELHFCQUFJLEdBQUo7UUFDQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBRXhFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFBO1FBQzFCLENBQUM7SUFDRixDQUFDO0lBRUQseUJBQVEsR0FBUixVQUFTLElBQWE7UUFDckIsR0FBRyxDQUFDLENBQWMsVUFBVyxFQUFYLEtBQUEsSUFBSSxDQUFDLE1BQU0sRUFBWCxjQUFXLEVBQVgsSUFBVztZQUF4QixJQUFJLEtBQUssU0FBQTtZQUNiLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1osS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDM0MsS0FBSyxDQUFBO1lBQ04sQ0FBQztTQUNEO0lBQ0YsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBakVELElBaUVDO0FBakVZLHdCQUFNIn0=