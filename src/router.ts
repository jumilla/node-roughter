
import * as pathToRegexp from 'path-to-regexp'

interface Route {
	re: RegExp;
	keys: string[];
	callback?: () => void;
}

export class Router {
	private window : Window

	private routes : Route[] = <Route[]>[]

	private onHashChanged : (e : HashChangeEvent) => void = null

	constructor(window : Window) {
		this.window = window
	}

	hash(path : string, callback : (...args : any[]) => void) : void {
		//if (path === undefined) throw new TypeError('invalid argument arg[1:path]')
		//if (arg === undefined) throw new TypeError('invalid argument arg[2:arg]')

		let keys = <string[]>[]
		const re = pathToRegexp(path, keys)

		const route : Route = {re, keys, callback}

		this.routes.push(route)
	}

	hashpath() : string {
		// cut prefix '#'
		let path = this.window.location.hash.slice(1)

		// cut prefix '/'
		if (path.lastIndexOf('/', 0) === 0) {
			path = path.slice(1)
		}

		return path
	}

	start() : void {
		if (! this.onHashChanged) {
			this.onHashChanged = event => {
				this.dispatch(this.hashpath())
			}

			this.window.addEventListener('hashchange', this.onHashChanged, false)

			this.dispatch(this.hashpath())
		}
	}

	stop() : void {
		if (this.onHashChanged) {
			this.window.removeEventListener('hashchange', this.onHashChanged, false)

			this.onHashChanged = null
		}
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
