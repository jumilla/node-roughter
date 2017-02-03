
import * as pathToRegexp from 'path-to-regexp'

function hashpath() : string {
	// cut prefix '#'
	return window.location.hash.slice(1)
}

/*
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0
		return this.lastIndexOf(searchString, position) === position
	};
}
*/

	interface Route {

	}

export class Dispatcher {
	private previous : string;

	private hashCurrent() : string {
		return hashpath()
	}

	private hashPrevious() : string {
		return this.previous
	}

	private hashRoutes() : [Route] {
		return <[Route]>[]
	}

	public hash = function (path, arg) {
		if (path === undefined) throw new TypeError('invalid argument arg[1:path]')
		if (arg === undefined) throw new TypeError('invalid argument arg[2:arg]')

		var keys = []
		var re = pathToRegexp(path, keys)

		var route = {
			re: re,
			keys: keys,
			callback: null,
		}

		if (typeof arg === 'function') {
			route.callback = arg
		}
		else {
			route.callback = function () {
				// TODO
				//riot.route(arg)
			}
		}

		this.hashRoutes.push(route)
	}

	public dispatch = function (path) {
		if (!path) {
			path = hashpath()
		}
		else {
			this.hashPrevious = this.hashCurrent
			this.hashCurrent = path
		}

		var routes = this.hashRoutes
		for (var index = 0; index < routes.length; ++index) {
			var route = routes[index]
			var result = route.re.exec(path)
			if (result) {
				route.callback.apply(this, result.slice(1))
				return
			}
		}
	}
}
