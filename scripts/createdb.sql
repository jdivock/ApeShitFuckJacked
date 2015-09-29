/* drop database apeshitfuckjacked;

create database apeshitfuckjacked;
\c apeshitfuckjacked
*/

DROP TABLE Account CASCADE;
DROP TABLE Workout CASCADE;
DROP TABLE Lift;

CREATE TABLE Account (
	id serial primary key,
	name VARCHAR(255),
	email VARCHAR(100),
	password VARCHAR(40)
);

CREATE TABLE Workout
(
	id serial primary key,
	date timestamp default current_timestamp,
	name VARCHAR(100),
	userId INTEGER,
	FOREIGN KEY(userId) REFERENCES Account(id)
);

CREATE TABLE Lift
(
	id serial PRIMARY KEY,
	workoutId INTEGER,
	name VARCHAR(100),
	reps INTEGER,
	sets INTEGER,
	weight INTEGER,
	FOREIGN KEY(workoutId) REFERENCES Workout(id)
);

INSERT INTO Account(name, email, password)
VALUES
('jdivock', 'jdivock@jdivock.com', 'asdf'),
('tpip', 'tpip@jdivock.com', 'asdf');

INSERT INTO Workout(date, name, userId)
VALUES
('2015-01-08 04:05:06', 'Squat day', 1),
('2015-01-18 04:05:06', 'Deadlift day', 1),
('2015-01-28 04:05:06', 'Bench day', 1),
('2015-02-08 04:05:06', 'Front Squat day', 1),
('2015-03-18 04:05:06', 'Upper Acc. day', 1),
('2015-03-08 04:05:06', 'Bench day', 2),
('2015-04-08 04:05:06', 'Front Squat day', 2),
('2015-06-08 04:05:06', 'Upper Acc. day', 2);

INSERT INTO Lift(workoutId, name, reps, sets, weight)
VALUES
(1, 'Squat', 5, 3, 315),
(1, 'Paused HB Squat', 8, 3, 225),
(1, 'Good Mornings', 8, 3, 135),
(1, 'Situps', 10, 3, 0),
(2, 'Deadlift', 5, 3, 315),
(2, 'Deficit Deadlift', 8, 3, 225),
(2, 'Deficit Straight Leg Deadlift', 8, 3, 135),
(2, 'GHR', 10, 3, 0),
(3, 'Front Squat', 5, 3, 315),
(3, 'Heavy Front Squat', 8, 3, 225),
(3, 'BB Rows', 8, 3, 135),
(3, 'Shrugs', 10, 3, 0);
