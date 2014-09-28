/** @jsx React.DOM */
'use strict';

var React = require('react');
var Login = require('./Login.react');

var AuthStore = require('../stores/AuthStore');


function getUser(){
	return AuthStore.getUser();
}

var ApeShitFuckJackedApp = React.createClass({
	getInitialState: function(){
		return {};
	},
	componentDidMount: function() {
		AuthStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		AuthStore.removeChangeListener(this._onChange);
	},
	_onChange: function(){
		this.setState(getUser());
	},
	render: function(){
		return (
			/*jshint ignore:start */
			<Login user={this.state}/>
			/*jshint ignore:end */
		);
	}
});

module.exports = ApeShitFuckJackedApp;