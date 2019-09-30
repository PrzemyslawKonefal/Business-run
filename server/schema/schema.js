const graphql = require('graphql');
const mongoose = require('mongoose');
const moment = require('moment');
const Author = require('../models/Author');
const Idea = require('../models/Idea');
const Comment = require('../models/Comment');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        age: { type: GraphQLInt },
        starredPostIds: { type: new GraphQLList(GraphQLString) },
        imgUrl: { type: GraphQLString },
        ideas: {
            type: new GraphQLList(IdeaType),
            resolve(parent) {
                return Idea.find({authorId: parent.id})
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent) {
                return Comment.find({authorId: parent.id})
            }
        }
    })
});

const IdeaType = new GraphQLObjectType({
    name: 'Idea',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        authorId: { type: GraphQLID },
        category: { type: GraphQLString },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent) {
                return Comment.find({postId: parent.id})
            }
        },
        starsUserIds: { type: new GraphQLList(GraphQLID) },
        stars: {
            type: new GraphQLList(AuthorType),
            resolve(parent) {
                const idsList = parent.starsUserIds.map(id => mongoose.Types.ObjectId(id));
                return Author.find({
                    '_id': {
                        $in: idsList
                    }
                })
            }
        },
        creationDate: { type: GraphQLString },
        lastUpdateDate: { type: GraphQLString },
    })
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: ( ) => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        authorId: { type: GraphQLID },
        postId: { type: GraphQLID },
        creationDate: { type: GraphQLString },
        lastUpdateDate: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent){
                return Author.findById(parent.authorId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Author.findById(args.id);
            }
        },
        idea: {
          type: IdeaType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args){
              return Idea.findById(args.id);
          }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(){
                return Author.find({});
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
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                username: { type: GraphQLString },
                age: { type: GraphQLInt },
                imgUrl: { type: GraphQLString },
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    username: args.username,
                    age: args.age,
                    imgUrl: args.age,
                    starredPostIds: []
                });
                return author.save();
            }
        },
        addIdea: {
            type: IdeaType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
                category: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                const timestamp = moment().format('YYYY-MM-DD, h:mm');
                const idea = new Idea({
                    title: args.title,
                    description: args.description,
                    authorId: args.authorId,
                    category: args.category,
                    comments: [],
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
                authorId: { type: GraphQLID },
                postId: { type: GraphQLID },
                responseId: {type: GraphQLID },
            },
            resolve(parent, args){
                const timestamp = moment().format('YYYY-MM-DD, h:mm');
                const comment = new Comment({
                    content: args.content,
                    authorId: args.authorId,
                    postId: args.postId,
                    responseId: args.responseId,
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
            resolve(parent, args) {
                Idea.findById(args.ideaId).exec().then(({starsUserIds}) => {
                    let starsList = starsUserIds.some(id => id === args.authorId)
                        ? starsUserIds.filter(id => id !== args.authorId)
                        : [ ...starsUserIds, args.authorId ];
                    return Idea.findByIdAndUpdate(args.ideaId, { starsUserIds: starsList }, { useFindAndModify: false })
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
