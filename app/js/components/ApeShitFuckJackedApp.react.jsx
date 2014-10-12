/** @jsx React.DOM */
'use strict';

var React = require('react'),
	Login = require('./Login.react'),
	Workouts = require('./Workouts.react'),
	WorkoutEntryForm = require('./WorkoutEntryForm.react'),
	AuthStore = require('../stores/AuthStore'),
	AuthActions = require('../actions/AuthActions');


var ApeShitFuckJackedApp = React.createClass({
	getInitialState: function(){
		var context = this.props.context;

		context.executeAction(AuthActions.getUser);


		this.AuthStore = context.getStore(AuthStore);
		return {
			user: {},
			workouts: []
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
		this.setState(this._getUser());
	},
	render: function(){
		return (
			<div>
				<Login user={this.state} context={this.props.context}/>
				<WorkoutEntryForm />
				<Workouts workouts={this.state.workouts} />
			</div>
		);
	}
});

module.exports = ApeShitFuckJackedApp;