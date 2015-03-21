/**
 * Copyright (c) 2015 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');

var NotFound = React.createClass({
  render: function() {
    return (
      <div className="page">
        <h1>Page Not Found</h1>
        <p>
          Sorry, but the page you are trying to view does not exist.
        </p>
      </div>      
    );
  }
});

module.exports = NotFound;