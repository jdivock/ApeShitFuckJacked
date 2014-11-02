/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Workout = require('./Workout.react');

var Workouts = React.createClass({
	render: function() {

		var workouts = this.props.workouts.map(function(workout, idx){
			return (
				<Workout 
					key={idx} 
					workout={workout} 
					context={this.props.context}
				/>
			);
		}.bind(this));

		return (
			<div className="workouts">
				{workouts}
			</div>
		);
	}
});

module.exports = Workouts;