import React from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { MuiThemeProvider } from '@material-ui/core';
import {BrowserRouter, Route} from 'react-router-dom';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

import Books from "./views/Books";
import LandingPage from "./views/LandingPage";
import Navbar from "./views/Navbar";
import LoginPage from "./views/LoginPage";
import defaultTheme from './styles/themes'
import { getCookie } from "./utils/functions";
import Authentication from "./hoc/Authentication";
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const authLink = new ApolloLink((operation, forward) => {
  const token = getCookie('access_token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const App = () => {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <MuiThemeProvider theme={defaultTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Authentication>
                <Navbar />
                <Route exact path='/' component={LandingPage}/>
                <Route exact path='/books' component={Books}/>
                <Route exact path='/login' component={LoginPage}/>
              </Authentication>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    );
};

export default App;
