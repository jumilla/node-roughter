/// <reference path='../typings/index.d.ts' />

import {assert} from 'chai'
import {Router} from '../lib/router'

describe('Router', () => {
	it('match path for string pattern', () => {
		const window = <Window>{}
		const router = new Router(window)

		let called = false

		router.hash('foo/bar', () => {
			called = true
		})

		router.dispatch('foo/bar')

		assert.equal(true, called)
	})

	it('match path for argumented pattern', () => {
		const window = <Window>{}
		const router = new Router(window)

		let called = false
		let id

		router.hash('foo/:id', (_id) => {
			called = true
			id = _id
		})

		router.dispatch('foo/0')

		assert.equal(true, called)
		assert.equal(0, id)
	})

	it('start router', () => {
		let window = <Window>{
			location: {
				hash: '',
			}
		}
		const router = new Router(window)

		let called = false

		window.addEventListener = () => {
			called = true
		}

		router.start()

		assert.equal(true, called)
	})

	it('start router when hash provided', () => {
		let window = <Window>{
			location: {
				hash: '#0',
			}
		}
		const router = new Router(window)

		let called = false

		window.addEventListener = () => {
			called = true
		}

		router.start()

		assert.equal(true, called)
	})

	it('stop router', () => {
		let window = <Window>{
			location: {
				hash: '',
			}
		}
		const router = new Router(window)

		let called = false

		window.removeEventListener = () => {
			called = true
		}

		router.stop()

		assert.equal(true, called)
	})
})
