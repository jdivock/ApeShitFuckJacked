'use strict';

var React = require('react'),
    debug = require('debug');

debug.enable('*');

debug('main.jsx')('spinning up');

window.React = React;

React.render(<div>Hey Der</div>, document.getElementById('app') );
//React.render(<BadMoviePoll></BadMoviePoll>, document.getElementById('app'));
