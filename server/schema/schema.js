const graphql = require('graphql');
const mongoose = require('mongoose');
const moment = require('moment');
const Idea = require('../models/Idea');
const User = require('../models/User');
const Comment = require('../models/Comment');
const AuthResolvers = require('../resolvers/auth');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const IdeaType = new GraphQLObjectType({
    name: 'Idea',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        authorId: { type: GraphQLID },
        starsUserIds: { type: new GraphQLList(GraphQLID) },
        creationDate: { type: GraphQLString },
        lastUpdateDate: { type: GraphQLString },
        author: {
            type: UserType,
            resolve(parent) {
                return User.findById(parent.authorId)
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent) {
                return Comment.find({postId: parent.id})
            }
        },
        stars: {
            type: new GraphQLList(UserType),
            resolve(parent) {
                const idsList = parent.starsUserIds.map(id => mongoose.Types.ObjectId(id));
                return User.find({
                    '_id': {
                        $in: idsList
                    }
                })
            }
        },
    })
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: ( ) => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        authorId: { type: GraphQLID },
        postId: { type: GraphQLID },
        responseId: { type: GraphQLID },
        creationDate: { type: GraphQLString },
        lastUpdateDate: { type: GraphQLString },
        starsAuthorIds: {type: new GraphQLList(GraphQLString)},
        author: {
            type: UserType,
            resolve(parent){
                return User.findById(parent.authorId);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        imgNumber: { type: GraphQLInt },
        gender: { type: GraphQLString },
        starredPostIds: { type: new GraphQLList(GraphQLString) }
    })
});

const AuthDataType = new GraphQLObjectType({
    name: 'AuthData',
    fields: () => ({
        userId: { type: GraphQLID },
        token: { type: GraphQLString },
        tokenExpiration: { type: GraphQLInt },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        idea: {
          type: IdeaType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args){
              return Idea.findById(args.id);
          }
        },
        ideas: {
            type: new GraphQLList(IdeaType),
            args: { category: { type: GraphQLString } },
            resolve(parent, args){
                const filters = {};
                if (args.category) filters.category = args.category;
                return Idea.find(filters);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addIdea: {
            type: IdeaType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args, req){
                if (!req.isAuth) {
                    throw new Error('Unauthorised');
                }
                const timestamp = moment().format('YYYY-MM-DD, h:mm');
                const idea = new Idea({
                    title: args.title,
                    description: args.description,
                    authorId: req.userId,
                    category: args.category,
                    starsUserIds: [],
                    creationDate: timestamp,
                    lastUpdateDate: timestamp
                });
                return idea.save();
            }
        },
        addComment: {
            type: CommentType,
            args: {
                content: { type: GraphQLString },
                postId: { type: GraphQLID },
                responseId: {type: GraphQLID },
            },
            resolve(parent, args, req){
                if (!req.isAuth) {
                    throw new Error('Unauthorised');
                }
                const timestamp = moment().format('YYYY-MM-DD, h:mm');
                const comment = new Comment({
                    content: args.content,
                    authorId: req.userId,
                    postId: args.postId,
                    responseId: args.responseId,
                    starsAuthorIds: [],
                    creationDate: timestamp,
                    lastUpdateDate: timestamp
                });
                return comment.save();
            }
        },
        toggleIdeaStar: {
            type: IdeaType,
            args: {
                authorId: { type: new GraphQLNonNull(GraphQLID) },
                ideaId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args, req) {
                if (!req.isAuth) {
                    throw new Error('Unauthorised');
                }
                Idea.findById(args.ideaId).exec().then(({starsUserIds}) => {
                    let starsList = starsUserIds.some(id => id === req.userId)
                        ? starsUserIds.filter(id => id !== req.userId)
                        : [ ...starsUserIds, req.userId ];
                    return Idea.findByIdAndUpdate(args.ideaId, { starsUserIds: starsList }, { useFindAndModify: false })
                });
            }
        },
        createUser: {
            type: GraphQLBoolean,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                birthDate: { type: GraphQLString },
                imgNumber: { type: GraphQLInt },
                gender: { type: GraphQLString },
            },
            resolve: AuthResolvers.createUser
        },
        login: {
            type: AuthDataType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve: AuthResolvers.login
        },
        getUserData: {
            type: UserType,
            resolve: AuthResolvers.userData
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
