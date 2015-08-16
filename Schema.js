import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList
} from 'graphql';


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
		}
		//workouts:
			//,
			// stories: {
			//   type: new GraphQLList(Story),
			//   resolve(parent, args, {db}) {
			//     return db.all(`
			//       SELECT * FROM Story WHERE author = $user
			//     `, {$user: parent.id});
			//   }
			// }
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
		}
	})
});

const Schema = new GraphQLSchema({
	query: Query
});
export default Schema;
