
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
	re: RegExp;
	keys: string[];
	callback?: () => void;
}

export class Router {
	private window : Window

	private previous : string

	private routes : Route[] = <Route[]>[]

	// private hashCurrent() : string {
	// 	return hashpath()
	// }

	// private hashPrevious() : string {
	// 	return this.previous
	// }

	// private hashRoutes() : Route[] {
	// 	return this.routes
	// }

	constructor(window : Window) {
		this.window = window
	}

	hash(path : string, arg : any) : void {
		//if (path === undefined) throw new TypeError('invalid argument arg[1:path]')
		//if (arg === undefined) throw new TypeError('invalid argument arg[2:arg]')

		let keys = <string[]>[]
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

	start() : void {
		this.window.addEventListener('hashchange', this.onHashChanged, false)

		const hash : string = hashpath()

		if (hash.length > 0) {
			this.dispatch(hash)
		}
	}

	stop() : void {
		this.window.removeEventListener('hashchange', this.onHashChanged, false)
	}

	private onHashChanged() : void {
		this.dispatch(hashpath())
	}

	dispatch(path? : string) : void {
		if (!path) {
			path = hashpath()
		}
		else {
			// this.hashPrevious = this.hashCurrent
			// this.hashCurrent = path
		}

		for (let route of this.routes) {
			const result = route.re.exec(path)

			if (result) {
				route.callback.apply(this, result.slice(1))
				break
			}
		}
	}
}
