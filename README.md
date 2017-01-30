
# Hash router

Tiny hash router.

```
router.hash('/', index)
router.hash('/user/:user', show)
router.hash('/user/:user/edit', edit)
router.hash('/user/:user/album', album)
router.hash('/user/:user/album/sort', sort)
router.hash('*', notfound)
```



## Installation

### for Browser

Download [roughter.min.js](https://raw.githubusercontent.com/jumilla/riot-dispatcher/master/dist/node-roughter.min.js) (master)

### for Node.js

```sh
npm install roughter --save
```



## License

[MIT](http://opensource.org/licenses/MIT).
