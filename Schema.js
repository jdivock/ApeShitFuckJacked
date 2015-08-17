import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLInt,
	GraphQLFloat,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList
} from 'graphql';

const Lift = new GraphQLObjectType({
	name: 'Lift',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		reps: {
			type: GraphQLInt
		},
		sets: {
			type: GraphQLInt
		},
		weight: {
			type: GraphQLFloat
		},
		name: {
			type: GraphQLString
		},
		workout: {
			type: Account,
			resolve(parent, args, {db}) {
				return db.query('SELECT * FROM Workout WHERE id = ${id^}',{id: workoutId});
			}
		}
	})
});

const Workout = new GraphQLObjectType({
	name: 'Workout',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		date: {
			type: GraphQLInt
		},
		name: {
			type: GraphQLString
		},
		account: {
			type: Account,
			resolve(parent, args, {db}) {
				console.log(parent);
				return db.query('SELECT * FROM Account WHERE id = ${id^}',{id: parent.userid}, 1);
			}
		},
		lifts: {
			type: new GraphQLList(Lift),
			resolve(parent, args, {db}) {
				return db.query('SELECT * FROM Lift WHERE workoutId = ${id^}',{id: parent.id});
			}
		}
	})
});


const Account = new GraphQLObjectType({
	name: 'Account',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		email: {
			type: GraphQLString
		},
		workouts: {
			type: new GraphQLList(Workout),
			resolve(parent, args, {db}) {
				return db.query('SELECT * FROM Workout WHERE userId = ${id^}',{id: parent.id});
			}
		}
	})
});

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		viewer: {
			type: Account,
			resolve(parent, args, {db, userId}) {
				return db.query('SELECT * FROM Account WHERE id = ${id^}',{id: userId},1);
			}
		},
		account: {
			type: Account,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve(parent, {id}, {db}) {
				return db.query('SELECT * FROM Account WHERE id = ${id^}',{id: id},1);
			}
		},
		workout: {
			type: Workout,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve(parent, {id}, {db}) {
				return db.query('SELECT * FROM Workout WHERE id = ${id^}',{id: id},1);
			}
		},
		lift: {
			type: Lift,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve(parent, {id}, {db}) {
				return db.query('SELECT * FROM Lift WHERE id = ${id^}',{id: id},1);
			}
		}
	})
});

const Schema = new GraphQLSchema({
	query: Query
});
export default Schema;
