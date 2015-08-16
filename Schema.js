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
      type: User,
      resolve(parent, args, {db}) {
        return db.get(`
          SELECT * FROM Workout WHERE id = $id
        `, {$id: parent.workoutId});
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
    user: {
      type: User,
      resolve(parent, args, {db}) {
        return db.get(`
          SELECT * FROM User WHERE id = $id
        `, {$id: parent.userId});
      }
    },
		lifts: {
			  type: new GraphQLList(Lift),
			  resolve(parent, args, {db}) {
			    return db.all(`
			      SELECT * FROM Lift WHERE workoutId = $workout
			    `, {$workout: parent.id});
			  }
		}
  })
});


const User = new GraphQLObjectType({
	name: 'User',
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
			    return db.all(`
			      SELECT * FROM Workout WHERE userId = $user
			    `, {$user: parent.id});
			  }
		}
	})
});

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		viewer: {
			type: User,
			resolve(parent, args, {db, userId}) {
				return db.get(`
						SELECT * FROM User WHERE id = $id
						`, {id: userId});
			}
		},
		user: {
			type: User,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve(parent, {id}, {db}) {
				return db.get(`
						SELECT * FROM User WHERE id = $id
						`, {$id: id});
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
		    return db.get(`
		      SELECT * FROM Workout WHERE id = $id
		      `, {$id: id});
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
		    return db.get(`
		      SELECT * FROM Lift WHERE id = $id
		      `, {$id: id});
		  }
		}
	})
});

const Schema = new GraphQLSchema({
	query: Query
});
export default Schema;
