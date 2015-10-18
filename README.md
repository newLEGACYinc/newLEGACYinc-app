newLEGACYinc-app
====

The official cross-platform application of [newLEGACYinc](https://www.youtube.com/user/newLEGACYinc).

This application is built using [Phonegap](http://phonegap.com/) on top of [Onsen UI](http://onsen.io/).

This repository is a bit of a mess.

## Information ##
 * [About](www/about.md)
 * [Changelog](CHANGELOG.md)
 * [Development](#development)
 * [License](LICENSE)

## Development ##

### Requirement

 * Node.js - [Install Node.js](http://nodejs.org)
 * Cordova - Install by `npm install cordova`

### Development Instructions

1. Install dependencies

    $ npm install

2. Install Gulp globally

    $ npm install -g gulp

3. Run `gulp serve` and run the web server

    $ gulp serve
    
4. Open `localhost:3000/index.html` in Chrome using [Ripple Emulator](https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc)
set to the Cordova 1.0.0 client.

#### Directory Layout

    README.md     --> This file
    gulpfile.js   --> Gulp tasks definition
    www/          --> Asset files for app
      index.html  --> App entry point
      js/
      styles/
      lib/onsen/
        stylus/   --> Stylus files for onsen-css-components.css
        js/       --> JS files for Onsen UI
        css/      --> CSS files for Onsen UI
    platforms/    --> Cordova platform directory
    plugins/      --> Cordova plugin directory
    merges/       --> Cordova merge directory
    hooks/        --> Cordova hook directory

### Gulp Tasks

 * `gulp serve` - Running the app for development.
 * `gulp build` - Build several files for project.
 * `gulp jshint` - Generate [jshint](https://github.com/jshint/jshint) report.
