/** @jsx React.DOM */
'use strict';

var React = require('react');
var Login = require('./Login.react');
var Workouts = require('./Workouts.react');
var LiftEntryForm = require('./LiftEntryForm.react');

var AuthStore = require('../stores/AuthStore');


function getUser(){
	return AuthStore.getUser();
}

var ApeShitFuckJackedApp = React.createClass({
	getInitialState: function(){
		return {
			user: {},
			workouts: []
		};
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
		console.log(this.state);
		return (
			/*jshint ignore:start */
			<div>
				<Login user={this.state}/>
				<LiftEntryForm />
				<Workouts workouts={this.state.workouts} />
			</div>
			/*jshint ignore:end */
		);
	}
});

module.exports = ApeShitFuckJackedApp;