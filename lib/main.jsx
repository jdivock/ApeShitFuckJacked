'use strict';

var React = require('react'),
    Parse = require('parse').Parse,
    Lifterly = require('components/Lifterly'),
    debug = require('debug');


debug.enable('*');

debug('main.jsx')('spinning up');

window.React = React;

React.render(<Lifterly/>, document.getElementById('app') );
//React.render(<BadMoviePoll></BadMoviePoll>, document.getElementById('app'));
