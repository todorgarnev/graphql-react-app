import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  NormalizedCacheObject
} from "@apollo/client";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Menu from './components/menu/Menu';
import Container from './components/container/Container';

const httpLink: ApolloLink = createHttpLink({
  uri: "http://localhost:5000"
});
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Menu />

        <Container>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Container>
      </ApolloProvider>
    </Router>
  );
}

export default App;
