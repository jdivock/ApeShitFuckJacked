/** @jsx React.DOM */

'use strict';

var React = require('react'),
 NavLink = require('flux-router-component').NavLink,
 debug = require('debug')('WorkoutView.jsx'),
 moment = require('moment'),
 WorkoutActions = require('../../actions/WorkoutActions');

var Lift = React.createClass({
	render: function() {

		return (
			<div className="lift">
				<h4>{this.props.lift.name}</h4>
				<div>Weight: {this.props.lift.weight}</div>
				<div>Reps: {this.props.lift.reps}</div>
				<div>Sets: {this.props.lift.sets}</div>
			</div>
		);
	}
});

var WorkoutView = React.createClass({
	
	deleteWorkout: function(){
		this.props.context.executeAction(WorkoutActions.deleteWorkout, {
			workoutId: this.props.workout.id
		});
	},
	editWorkout: function(){
		this.props.setEdit();
	},
	render: function() {

		var lifts = this.props.workout.lifts.map(function(lift, idx){
			return <Lift key={idx} lift={lift} />;
		});

		var navParams = { id: this.props.workout.id};

		return (
			<div className="workout">
				<h3>
					<NavLink 
						name="workout" 
						context={this.props.context}
						navParams={navParams}
					>
						<span>{moment(this.props.workout.date).format('l') }</span>
					</NavLink>
					<span className="actions">
 					<button 
 						className="pure-button button-xsmall" 
 						onClick={this.editWorkout}>
 						edit
 					</button>
 					<button 
 						className="button-error pure-button button-xsmall" 
 						onClick={this.deleteWorkout}>
 						X
 					</button>
					</span>
				</h3>
				
				<div className="lifts">
					{lifts}
				</div>
				<p>{this.props.workout.comments}</p>
			</div>
		);
	}
});

module.exports = WorkoutView;