'use strict';

var React = require('react'),
    Parse = require('parse').Parse,
    Lifterly = require('components/Lifterly'),
    debug = require('debug');

Parse.initialize("b6CKF1yyr40lUtp3o390OWxXQzKaK2SIFkNpmPUZ", "005j2FySLT2VC1tuWkendwiCqcw5msCKsXMwVQnm");

debug.enable('*');

debug('main.jsx')('spinning up');

window.React = React;

React.render(<Lifterly/>, document.getElementById('app') );
//React.render(<BadMoviePoll></BadMoviePoll>, document.getElementById('app'));
