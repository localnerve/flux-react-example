# [Flux-React-Example](https://github.com/localnerve/flux-react-example)

![Maintenance](https://img.shields.io/maintenance/yes/2016.svg)
[![Build Status](https://secure.travis-ci.org/localnerve/flux-react-example.svg?branch=master)](http://travis-ci.org/localnerve/flux-react-example)
[![Coverage Status](https://coveralls.io/repos/localnerve/flux-react-example/badge.svg?branch=master)](https://coveralls.io/r/localnerve/flux-react-example?branch=master)
[![Codacy Badge](https://www.codacy.com/project/badge/60366103040442ad9fbf5f8e33373f18)](https://www.codacy.com/public/alex/flux-react-example)
[![Dependency Status](https://david-dm.org/localnerve/flux-react-example.svg)](https://david-dm.org/localnerve/flux-react-example)
[![devDependency Status](https://david-dm.org/localnerve/flux-react-example/dev-status.svg)](https://david-dm.org/localnerve/flux-react-example#info=devDependencies)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/localnerve.svg)](https://saucelabs.com/u/localnerve)

> A data-driven, isomorphic example application using [Fluxible](http://fluxible.io) and [React](http://reactjs.com).  
> A **newer** version of this idea exists at **[react-pwa-reference](https://github.com/localnerve/react-pwa-reference)**

Flux-React-Example is an example contact web application. Serves as a reference app to inspire isomorphic application development solutions.

* Features a **data-driven** isomorphic React application that follows the flux flow using [Fluxible](https://github.com/yahoo/fluxible).
* Uses a Node, Express, Fluxible, React stack employing Grunt, Webpack, and Mocha/Chai.
* Employs Yahoo Fetchr for uniform client/server access to app services.
* Features a Flexbox layout with some very light usage of Foundation For Apps (The Sass mixins only, no JS, all possible CSS output disabled).
* Performance Features
  * Majority of visual completeness in < 14k initial download.
  * Fast rendering.

## Docs
Additional documentation can be found in this project's [wiki](https://github.com/localnerve/flux-react-example/wiki). This is still in progress.

## Progressive Work
Continued progress on this project toward a Progressive Application (includes a Manifest and Service Worker *offline*, *push notifications*, and *background sync*) exists at [flux-react-example-sw](https://github.com/localnerve/flux-react-example-sw).

## Integrations
This example demonstrates a full CI/CD integration on the master branch. Pushes to the master branch run the following workflow:
  1. Run unit tests w/coverage on Travis-ci.
  2. Build and deploy to the Heroku stage.
  3. Run cross-browser/platform functional tests on SauceLabs against the stage.
  4. Run performance budget tests on webpagetest.org against the stage.

## Developer Instructions

### Build Environment Prerequisites
1. NodeJS ~4.2
  * Globally installed grunt-cli `npm install -g grunt-cli`
2. Ruby >= 2.1.3p242 (Any version that runs Compass is fine)
  * Globally installed Compass >= 1.0.1 `gem install compass`

### Setup
1. Clone this repo
2. Install the dependencies

```bash
$ npm install
```

### Run the app\*

```bash
$ npm run build
$ npm start
```

Open http://localhost:3000

\*Assumes you *don't* have NODE_ENV set in your environment. If you do have it set, it must be set to "production" to run the production build of the app this way. If you use NODE_ENV in your environment for something else and still want to just run the production app, use [this](#debug-production-build) method.

### Run in dev mode

```bash
$ npm run dev
```

This will use `nodemon` and `webpack` to watch for changes and restart and
rebuild as needed.

Open http://localhost:3000


### Debug production build
```bash
$ npm run prod
```

This will use `nodemon` and `webpack` to watch for changes and restart and
rebuild as needed.

Open http://localhost:3000


### Debug the server-side parts of the app
1. Start node-inspector on the port of your choice in the background
```bash
$ node-inspector --web-port=<port-of-choice> &
```
2. Run the debug build (a very slightly modified dev build)
```bash
$ npm run debug
```
3. Use Chrome to open `http://127.0.0.1:8090/?ws=127.0.0.1:<port-of-choice>&port=5858`
4. Set breakpoints and/or hit F8 to start the server-side of the app.

This will use `nodemon` and `webpack` to watch for changes and restart and
rebuild as needed. The nodemon process will start with `--debug-brk` option to let you break on anything from the ground up.

## License

Unless otherwise specified, this software is free to use under the LocalNerve BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: /LICENSE.md
