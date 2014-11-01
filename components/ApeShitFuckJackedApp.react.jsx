/** @jsx React.DOM */
'use strict';

var React = require('react'),
	Login = require('./Login.react'),
	Workouts = require('./Workouts.react'),
	Profile = require('./Profile.react'),
	WorkoutEntryForm = require('./WorkoutEntryForm.react'),
	debug = require('debug')('ApeShitFuckJackedApp.jsx'),
	RouterMixin = require('flux-router-component').RouterMixin,
	AuthActions = require('../actions/AuthActions');


var ApeShitFuckJackedApp = React.createClass({
	mixins: [RouterMixin],
	getInitialState: function(){
		var context = this.props.context;

		this.AppStore =  context.getStore('ApplicationStore');
		this.AuthStore = context.getStore('AuthStore');

		return {
			app: this.AppStore.getState(),
			user: this._getUser()
		};
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
		this.setState({app: state});
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

		switch (this.state.app.currentPageName) {
			case 'profile':
				view = <Profile 
					context={this.props.context}
					user={this.state.user}
					/>;
				break;
			case 'workout':
				// TODO: Single workout view
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