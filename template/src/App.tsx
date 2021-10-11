import React from 'react';
import { Home } from './pages'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { graphQLClient } from './store/store'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ApolloProvider client={graphQLClient}>
      <div>
        <Router>
          <Route path='/' component={Home}/>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
