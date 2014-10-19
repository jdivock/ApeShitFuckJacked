/** @jsx React.DOM */
'use strict';

var React = require('react'),
	Login = require('./Login.react'),
	Workouts = require('./Workouts.react'),
	WorkoutEntryForm = require('./WorkoutEntryForm.react'),
	AuthStore = require('../stores/AuthStore'),
	debug = require('debug')('ApeShitFuckJackedApp.jsx'),
	AuthActions = require('../actions/AuthActions');


var ApeShitFuckJackedApp = React.createClass({
	getInitialState: function(){
		var context = this.props.context;

		this.AuthStore = context.getStore(AuthStore);

		return {
			user: this._getUser()
		};
	},
	componentDidMount: function() {
		this.AuthStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		this.AuthStore.removeChangeListener(this._onChange);
	},
	_getUser: function(){
		return this.AuthStore.getUser();
	},
	_onChange: function(){
		debug('authstore change', this._getUser());
		this.setState({user: this._getUser()});
	},
	render: function(){
		return (
			/*jshint ignore:start */
			<div>
				<Login 
					user={this.state.user} 
					context={this.props.context}/>
				<div className="container">
					<WorkoutEntryForm 
						context={this.props.context}
						user={this.state.user}/>
					<Workouts workouts={this.state.user.workouts} />
				</div>
			</div>
			/*jshint ignore:end */
		);
	}
});

module.exports = ApeShitFuckJackedApp;