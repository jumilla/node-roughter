
var riot = require('riot')
var pathToRegexp = require('path-to-regexp')

function hashpath() {
	// cut prefix '#'
	return window.location.hash.slice(1)
}

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0
		return this.lastIndexOf(searchString, position) === position
	};
}

var dispatcher = (function () {
	var object = {
		hashCurrent: hashpath(),
		hashPrevious: '',
		hashRoutes: [],
	}

	object.hash = function (path, arg) {
		if (path === undefined) throw new TypeError('invalid argument arg[1:path]')
		if (arg === undefined) throw new TypeError('invalid argument arg[2:arg]')

		var keys = []
		var re = pathToRegexp(path, keys)

		var route = {
			re: re,
			keys: keys,
		}

		if (typeof arg === 'function') {
			route.callback = arg
		}
		else {
			route.callback = function () {
				riot.route(arg)
			}
		}

		object.hashRoutes.push(route)
	}

	object.dispatch = function (path) {
		if (!path) {
			path = hashpath()
		}
		else {
			object.hashPrevious = object.hashCurrent
			object.hashCurrent = path
		}

		var routes = object.hashRoutes
		for (var index = 0; index < routes.length; ++index) {
			var route = routes[index]
			var result = route.re.exec(path)
			if (result) {
				route.callback.apply(object, result.slice(1))
				return
			}
		}
	}

	riot.route.parser(function (path) {
		return path
	})

	riot.route(object.dispatch)

	return object
}())

module.exports = dispatcher
