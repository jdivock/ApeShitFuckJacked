DROP TABLE User;
DROP TABLE Workout;
DROP TABLE Lift;

CREATE TABLE User
(
	id INTEGER PRIMARY KEY,
	name VARCHAR(255),
	email VARCHAR(100),
	password VARCHAR(40)
);

CREATE TABLE Workout
(
	id INTEGER PRIMARY KEY,
	date INTEGER,
	name VARCHAR(100),
	userId INTEGER,
	FOREIGN KEY(userId) REFERENCES User(id)
);

CREATE TABLE Lift
(
	id INTEGER PRIMARY KEY,
	workoutId INTEGER,
	name VARCHAR(100),
	reps INTEGER,
	sets INTEGER,
	weight INTEGER,
	FOREIGN KEY(workoutId) REFERENCES Workout(id)
);

INSERT INTO User('name', 'email', 'password')
VALUES
('jdivock', 'jdivock@jdivock.com', 'asdf'),
('tpip', 'tpip@jdivock.com', 'asdf');

INSERT INTO Workout('date', 'name', 'userId')
VALUES
(1439702488, 'Squat day', 1),
(1439602488, 'Deadlift day', 1),
(1439502488, 'Bench day', 1),
(1439402488, 'Front Squat day', 1),
(1439302488, 'Upper Acc. day', 1),
(1439502488, 'Bench day', 2),
(1439402488, 'Front Squat day', 2),
(1439302488, 'Upper Acc. day', 2);

INSERT INTO Lift('workoutId', 'name', 'reps', 'sets', 'weight')
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
