
# Riot Dispatcher

Tiny hash router.

```
riot.dispatcher.hash('/', index)
riot.dispatcher.hash('/user/:user', show)
riot.dispatcher.hash('/user/:user/edit', edit)
riot.dispatcher.hash('/user/:user/album', album)
riot.dispatcher.hash('/user/:user/album/sort', sort)
riot.dispatcher.hash('*', notfound)
```



## Installation

### for Browser

Download [roughter.min.js](https://raw.githubusercontent.com/jumilla/riot-dispatcher/master/dist/node-roughter.min.js) (master)

or 

NPM

```sh
npm install roughter --save
```



## License

[MIT](http://opensource.org/licenses/MIT).
