/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react'),
	WorkoutEntryForm = require('./workout/WorkoutEntryForm.react'),
	Workouts = require('./workout/Workouts.react');


var DefaultWorkoutsView = React.createClass({
	render: function(){
		return (
			<div>
				<WorkoutEntryForm 
					context={this.props.context}
					user={this.props.user}
				/>
				<Workouts 
					workouts={this.props.user.workouts} 
					context={this.props.context}
				/>
			</div>
		);
	}
});

module.exports = DefaultWorkoutsView;