
import * as pathToRegexp from 'path-to-regexp'

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

	hash(path : string, callback : () => void) : void {
		//if (path === undefined) throw new TypeError('invalid argument arg[1:path]')
		//if (arg === undefined) throw new TypeError('invalid argument arg[2:arg]')

		let keys = <string[]>[]
		const re = pathToRegexp(path, keys)

		const route : Route = {re, keys, callback}

		this.routes.push(route)
	}

	hashpath() : string {
		// cut prefix '#'
		return this.window.location.hash.slice(1)
	}

	start() : void {
		this.window.addEventListener('hashchange', this.onHashChanged, false)

		const hash : string = this.hashpath()

		if (hash.length > 0) {
			this.dispatch(hash)
		}
	}

	stop() : void {
		this.window.removeEventListener('hashchange', this.onHashChanged, false)
	}

	private onHashChanged() : void {
		this.dispatch(this.hashpath())
	}

	dispatch(path : string) : void {
		for (let route of this.routes) {
			const result = route.re.exec(path)

			if (result) {
				route.callback.apply(this, result.slice(1))
				break
			}
		}
	}
}
