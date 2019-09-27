const graphql = require('graphql');
const moment = require('moment');
const Book = require('../models/book');
const Author = require('../models/Author');
const Idea = require('../models/Idea');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent){
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent){
                return Book.find({ authorId: parent.id });
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
        comments: { type: new GraphQLList(GraphQLID) },
        stars: { type: new GraphQLList(GraphQLID) },
        creationDate: { type: GraphQLString },
        lastUpdateDate: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Book.findById(args.id);
            }
        },
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
              return Author.findById(args.id);
          }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(){
                return Book.find({});
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
                if( args.category ) filters.category = args.category;
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
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
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
                console.log(timestamp)
                const idea = new Idea({
                    title: args.title,
                    description: args.description,
                    authorId: args.authorId,
                    category: args.category,
                    comments: [],
                    stars: [],
                    creationDate: timestamp,
                    lastUpdateDate: timestamp
                });
                return idea.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
