/** @jsx React.DOM */

'use strict';

var React = require('react'),
 AuthStore = require('../stores/AuthStore'),
 WorkoutInput = require('./WorkoutInput.react'),
 moment = require('moment'),
 WorkoutActions = require('../actions/WorkoutActions');

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

		return (
			<div className="workout">
				<h3>
					{moment(this.props.workout.date).format('L')}
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