# phaser_breakout

Yet another breakout clone. However this one is built on top of phaser ce, in my coding style, and serves as an example project of sorts for the sake of making more stuff to write about on my blog here at git hub pages. Also There is also the possibility of putting in some neat features, that might be noval, or at least an original collection of features. That is, putting a unique spin on something that has all ready been done to death.

## To run locally

To run locally one way would be to clone down a shallow copy of the latest state at master, cd into it, and run an npm install. Once express is installed running the main app.js file will start a static server that will host the game locally via http://localhost:8080

```
$ git clone --depth 1 https://github.com/dustinpfister/phaser_breakout
$ cd phaser_breakout
$ npm install
$ node app
```

This game does not have any complex backend, the app.js file is just a way of setting up a simple static server for the public folder. So if you have another way of hosting something locally the public folder is what you want hosted as root.