/** @jsx React.DOM */
'use strict';

var React = require('react');
var Login = require('./components/login.react');

window.React = React;


/*jshint ignore:start */
React.renderComponent(
	<Login />, 
	document.body);
/*jshint ignore:end */