import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Route} from 'react-router-dom';
import Books from "./views/Books";
import LandingPage from "./views/LandingPage";

// components

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/books' component={Books}/>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
