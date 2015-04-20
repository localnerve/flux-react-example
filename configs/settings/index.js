/**
 * Copyright (c) 2015 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var path = require('path');
var _ = require('lodash');

var assetsJsonFile = './assets.json';
var distbase = 'dist';
var assetsbase = 'assets';
var publicbase = '/public';

/**
 * Prepends a path to object values.
 * Returns a new object result.
 */
function prependPathToObject (fromObj, prePath) {
  return Object.keys(fromObj).reduce(function (obj, key) {
    var fromValue = fromObj[key];
    if (typeof fromValue === 'string') {
      obj[key] = path.join(prePath, fromValue);
    } else {
      obj[key] = fromValue;
    }
    return obj;
  }, {});
}

/**
 * A configuration for loading and decorating assets json at a later time
 */
function assetsConfig (baseDir) {
  function Config (dir) {
    this.baseDir = dir;
  }
  Config.prototype = {
    load: function () {
      if (!this.assets) {
        this.assets = require(assetsJsonFile).assets;
      }
      return this;
    },
    mainScript: function () {
      this.load();
      var main = Array.isArray(this.assets.main) ? this.assets.main[0] : this.assets.main;
      return path.join(this.baseDir, main);
    }
  };
  return new Config(baseDir);
}

/**
 * Directories and files that are in src, distribution, and web
 */
var commonDirs = {
  images: 'images',  
  styles: 'styles',
  fonts: 'fonts',
  scripts: 'scripts'
};
var commonFiles = {
  four04: '404.html',
  five03: '503.html',
  favicon: path.join(commonDirs.images, 'favicon.ico'),  
  robots: 'robots.txt',
  sitemap: 'sitemap.xml',
  headerScript: path.join(commonDirs.scripts, 'header.js')
};

/**
 * Directories and files that are in both dist and web
 */
var outputDirs = {
  // scripts: 'scripts'
};
var outputFiles = {
  css: path.join(commonDirs.styles, 'index.css')
};

/**
 * Source only dirs and files
 */
var srcDirs = {
  components: 'components',
  config: 'configs',
  assets: assetsbase
};
var srcFiles = {
  assetsJson: path.join(srcDirs.config, path.basename(__dirname), assetsJsonFile)
};

/**
 * Settings to override by environment
 */
function overrides (env, baseDir) {
  var envOverrides = {
    production: {
      dist: {
        baseDir: path.join(baseDir, distbase, 'release')
      },
      loggerFormat: 'tiny',
      web: {
        // ssl: true,
        assetAge: 31556926000
      }
    }
  };
  return envOverrides[env];
}

function makeConfig (nconf) {
  var env = nconf.get('NODE_ENV');

  // Update baseDir if defined
  var baseDir = nconf.get('baseDir') || '.';
  
  /**
   * The exported settings config
   */
  var config = {
    dist: {
      baseDir: path.join(baseDir, distbase, 'debug')
    },
    src: {
      baseDir: baseDir
    },
    web: {
      baseDir: publicbase,
      assetAge: 0,
      ssl: false
    },

    // unmovable project directories
    distbase: distbase,
    vendor: {
      css: 'node_modules/foundation-apps/scss'
    },

    loggerFormat: 'dev'
  };

  // Environment overrides
  _.merge(config, overrides(env, baseDir));

  // Assemble config.src
  _.assign(
    config.src,
    prependPathToObject(commonDirs, path.join(config.src.baseDir, assetsbase)),
    prependPathToObject(commonFiles, path.join(config.src.baseDir, assetsbase)),
    prependPathToObject(srcDirs, config.src.baseDir),
    prependPathToObject(srcFiles, config.src.baseDir)
  );

  // Assemble config.dist and config.web
  [config.dist, config.web].forEach(function (config) {
    _.assign(
      config,
      prependPathToObject(commonDirs, config.baseDir),
      prependPathToObject(commonFiles, config.baseDir),
      prependPathToObject(outputDirs, config.baseDir),
      prependPathToObject(outputFiles, config.baseDir)
    );
  });
  config.web.assets = assetsConfig(config.web.scripts);

  return config;
}

module.exports = makeConfig;