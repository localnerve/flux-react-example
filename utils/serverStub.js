/***
 * Copyright (c) 2015, 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 *
 * Build stub for ReactDOMServer to keep it out of the client bundle.
 */
'use strict';

var noop = require('lodash/noop');

/**
 * ReactDOMServer dummy.
 */
var ReactDOMServer = {
  renderToString: noop,
  renderToStaticMarkup: noop
};

module.exports = ReactDOMServer;
