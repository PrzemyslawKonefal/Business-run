const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const isAuth = require('./middlewares/is-auth');

const app = express();
require('./models/User');
// allow cross-origin requests
app.use(isAuth);
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb+srv://przemek:Fa8a22aC!MON@gql-tutorial-e0o83.mongodb.net/test?retryWrites=true&w=majority\n', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to database')
})

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
