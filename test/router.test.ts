/// <reference path='../typings/index.d.ts' />

import {assert} from 'chai'
import {Route, Dispatcher} from '../src/dispatcher'

describe('Dispatcher', function() {
	it('ほげ', function() {
		const dispatcher = new Dispatcher()
		assert.notEqual(null, dispatcher)
	})
})
