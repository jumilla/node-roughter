
const hash = (function () {
	var object = {}

	object.current = function () {
		return riot.dispatcher.hashCurrent
	}

	object.previous = function () {
		return riot.dispatcher.hashPrevious
	}

	object.go = function (path, args) {
		window.location.hash = path
	}

	return object
}())

export default hash
