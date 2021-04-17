import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  NormalizedCacheObject
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import store from "./store/store";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Navigation from './components/navigation/Navigation';
import Container from './components/container/Container';
import Auth from './common/utils/auth';

const httpLink: ApolloLink = createHttpLink({
  uri: "http://localhost:5000"
});
const authLink = setContext(() => {
  if (Auth.isTokenSet()) {
    const token: string = localStorage.getItem("jwtToken") as string;

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
});
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ApolloProvider client={client}>
          <Navigation />

          <Container>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Container>
        </ApolloProvider>
      </Router>
    </Provider>
  );
}

export default App;
