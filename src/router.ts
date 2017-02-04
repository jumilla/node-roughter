
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

export interface Route {
	re: RegExp;
	keys: [string];
	callback?: () => void;
}

export class Dispatcher {
	private previous : string;

	private routes : [Route] = <[Route]>[]

	private hashCurrent() : string {
		return hashpath()
	}

	private hashPrevious() : string {
		return this.previous
	}

	private hashRoutes() : [Route] {
		return this.routes
	}

	public hash(path : string, arg) : void {
		//if (path === undefined) throw new TypeError('invalid argument arg[1:path]')
		//if (arg === undefined) throw new TypeError('invalid argument arg[2:arg]')

		let keys = <[string]>[]
		const re = pathToRegexp(path, keys)

		const route : Route = {re, keys}

		if (typeof arg === 'function') {
			route.callback = arg
		}
		else {
			route.callback = function () {
				// TODO
				//riot.route(arg)
			}
		}

		this.routes.push(route)
	}

	public dispatch(path? : string) {
		if (!path) {
			path = hashpath()
		}
		else {
			this.hashPrevious = this.hashCurrent
			this.hashCurrent = path
		}

		var routes = this.routes
		for (let route of this.routes) {
			const result = route.re.exec(path)
			if (result) {
				route.callback.apply(this, result.slice(1))
				return
			}
		}
	}
}
