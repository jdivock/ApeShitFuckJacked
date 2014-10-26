/**
 * @jsx React.DOM
 */

 'use strict';

var React = require('react/addons'),
	_ = require('lodash'),
	WorkoutInput = require('./WorkoutInput.react'),
	AuthStore = require('../stores/AuthStore'),
	WorkoutActions = require('../actions/WorkoutActions');


 var WorkoutEntryForm = React.createClass({
 	getInitialState: function(){
 		return {
 			view: 'INITIAL'
 		};
 	},
 	setFormState: function(state){
 		this.setState({
 			view: state 
 		});
 	},
 	setFormStateAdd: function(){
 		this.setState({
 			view: 'FORM'
 		});
 	},
 	clear: function(){
 		this.setState({
 			view: 'INITIAL'
 		});
 	},
 	submitWorkout: function(workout){
 		// Firing workout save action
		this.props.context.executeAction(WorkoutActions.createWorkout, workout);

		this.clear();
 	},
 	render: function() {
 		var form,
 			formView;

 		if(!this.props.user.loggedIn){
 			formView = null;
 		} else {
 			formView = this.state.view;
 		}

 		switch (formView) {
 			case 'FORM':
 				/*jshint ignore:start */
 				form = <WorkoutInput 
 						submitWorkout={this.submitWorkout}
 						cancel={this.clear}
 						type='CREATE'
 						/>;
 				/*jshint ignore:end */
 				break;
 			case 'INITIAL':
 				/*jshint ignore:start */
 				form = <button 
 						className="pure-button pure-button-primary" 
 						onClick={this.setFormStateAdd}>
 						Add Workout
 						</button>;
 				/*jshint ignore:end */
 				break;

 			default:
 				form = '';
 		}

 		return (
 			/*jshint ignore:start */
 			<div className="lift-entry-form">
 				{form}
 			</div>
 			/*jshint ignore:end */
 		);
 	}
 });

 module.exports = WorkoutEntryForm;