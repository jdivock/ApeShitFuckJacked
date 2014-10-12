/** @jsx React.DOM */

'use strict';

var React = require('react');
var AuthStore = require('../stores/AuthStore');
var AuthActions = require('../actions/AuthActions');

 var Lift = React.createClass({
 	render: function() {
 		return (
 			/*jshint ignore:start */
 			<div className="lift">
 				<h4>{this.props.lift.name}</h4>
 				<div>Weight: {this.props.lift.weight}</div>
 				<div>Reps: {this.props.lift.reps}</div>
 				<div>Sets: {this.props.lift.sets}</div>
 			</div>
 			/*jshint ignore:end */
 		);
 	}
 });

 var Workout = React.createClass({
 	render: function() {
 		var lifts = this.props.workout.lifts.map(function(lift, idx){
 			/*jshint ignore:start */
 			return <Lift key={idx} lift={lift} />
 			/*jshint ignore:end */
 		});

 		return (
 			/*jshint ignore:start */
 			<div className="workout">
 				<h3>{this.props.workout.date}</h3>
 				{lifts}
 			</div>
 			/*jshint ignore:end */
 		);
 	}
 });


var Workouts = React.createClass({
	render: function() {

		var workouts = this.props.workouts.map(function(workout, idx){
			/*jshint ignore:start */
			return <Workout key={idx} workout={workout}/>
			/*jshint ignore:end */
		});

		return (
			/*jshint ignore:start */
			<div className="workouts">
				{workouts}
			</div>
			/*jshint ignore:end */
		);
	}
});

 module.exports = Workouts;