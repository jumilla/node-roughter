
# Hash router

[![Build Status](https://travis-ci.org/jumilla/node-roughter.svg)](https://travis-ci.org/jumilla/node-roughter)


Tiny hash router.

```
router.hash('/', index)
router.hash('/user/:user', show)
router.hash('/user/:user/edit', edit)
router.hash('/user/:user/album', album)
router.hash('/user/:user/album/sort', sort)
router.hash('*', notfound)

// start router
router.start()
```



## Installation

### for Browser

Download [roughter.min.js](https://raw.githubusercontent.com/jumilla/node-roughter/master/dist/roughter.min.js) (master)

### for Node.js

```sh
npm install roughter --save
```



## License

[MIT](http://opensource.org/licenses/MIT).
