/** @jsx React.DOM */
'use strict';

var React = require('react'),
	Login = require('./Login.react'),
	Workouts = require('./Workouts.react'),
	Profile = require('./Profile.react'),
	WorkoutEntryForm = require('./WorkoutEntryForm.react'),
	SingleWorkoutView = require('./SingleWorkoutView.react'),
	debug = require('debug')('ApeShitFuckJackedApp.jsx'),
	_ = require('lodash'),
	RouterMixin = require('flux-router-component').RouterMixin,
	AuthActions = require('../actions/AuthActions');


var ApeShitFuckJackedApp = React.createClass({
	mixins: [RouterMixin],
	getInitialState: function(){
		var context = this.props.context;

		this.AppStore =  context.getStore('ApplicationStore');
		this.AuthStore = context.getStore('AuthStore');

		var initState = this.AppStore.getState();
		initState.user = this._getUser();

		return initState;
	},
	componentDidMount: function() {
		this.AuthStore.addChangeListener(this._onChange);
		this.AppStore.addChangeListener(this._onAppChange);
	},
	componentWillUnmount: function() {
		this.AuthStore.removeChangeListener(this._onChange);
		this.AppStore.removeChangeListener(this._onAppChange);
	},
	_onAppChange: function(){
		var state = this.AppStore.getState();
		this.setState(state);
	},
	_getUser: function(){
		return this.AuthStore.getUser();
	},
	_onChange: function(){
		debug('authstore change', this._getUser());
		this.setState({user: this._getUser()});
	},
	render: function(){
		var view;

		switch (this.state.currentPageName) {
			case 'profile':
				view = (
					<Profile 
						context={this.props.context}
						user={this.state.user}
					/>
					);
				break;
			case 'workout':

				var workout = _.find(this.state.user.workouts, {id: +this.state.route.params.id});
				
				view = (
					<SingleWorkoutView
						context={this.props.context}
						key={this.state.route.params.id}
						workout={workout}
					/>
				);
				
				break;
			default:
				view = 
					<div>
					<WorkoutEntryForm 
						context={this.props.context}
						user={this.state.user}
					/>
					<Workouts 
						workouts={this.state.user.workouts} 
						context={this.props.context}
					/>
					</div>;
		}

		return (
			<div>
				<Login 
					user={this.state.user} 
					context={this.props.context}/>
				<div className="container">
					{view}
				</div>
			</div>
		);
	}
});

module.exports = ApeShitFuckJackedApp;