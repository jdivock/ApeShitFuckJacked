/** @jsx React.DOM */

'use strict';

var React = require('react'),
 WorkoutView = require('./WorkoutView.react'),
 WorkoutInput = require('./WorkoutInput.react'),
 debug = require('debug')('Workout.react.jsx'),
 WorkoutActions = require('../../actions/WorkoutActions');



 var Workout = React.createClass({
	getInitialState: function(){
		return {
			edit: false
		};
	},
	setEdit: function(){
		this.setState({
			edit: true
		});
	},
	setRead: function(){
		this.setState({
			edit: false
		});
	},
	submitWorkout: function(workout){
		this.props.context.executeAction(WorkoutActions.updateWorkout, workout);

		this.setRead();
	},
	render: function(){
		var workout;

		if(this.state.edit){
			return (
				<WorkoutInput 
					workout={this.props.workout}
					submitWorkout={this.submitWorkout}
					cancel={this.setRead}
					type='EDIT'
				/>
			);
		} else {
			return ( 
				<WorkoutView
	 				key={this.propsidx} 
					workout={this.props.workout} 
					context={this.props.context}
					setEdit={this.setEdit}
				/> 
		);
		}
	}

});

module.exports = Workout;