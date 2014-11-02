/** @jsx React.DOM */

'use strict';

var React = require('react'),
 Workout = require('./workout/Workout.react'),
 NavLink = require('flux-router-component').NavLink;


var SingleWorkoutView = React.createClass({
	render: function(){

		return(
			<div>
				<NavLink href="/" context={this.props.context}>
					Back
				</NavLink>
				<Workout
					key={this.props.id}
					workout={this.props.workout}
					context={this.props.context}
				/>
			</div>
		);

	}
});


module.exports = SingleWorkoutView;