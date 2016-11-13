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

### Setup

1. Install dependencies

    $ npm install -g bower gulp cordova
    $ npm install

3. Add platform

    $ cordova platform add android

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

### Gulp Tasks

 * `gulp build` - Build several files for project.
 * `gulp jshint` - Generate [jshint](https://github.com/jshint/jshint) report.
