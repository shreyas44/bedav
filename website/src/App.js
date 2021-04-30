import { ApolloProvider, InMemoryCache } from "@apollo/client";
import { LocalForageWrapper, persistCache } from "apollo3-cache-persist";
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import Header from "./components/Header";
import NotLiveRoute from "react-live-route";
import getClient from "./client";
import localForage from "localforage";

const LiveRoute = withRouter(NotLiveRoute);
const HomePage = lazy(() => import("./components/home"));
const LocalityPage = lazy(() => import("./components/locality"));
const AboutPage = lazy(() => import("./components/about"));
const HospitalPage = lazy(() => import("./components/hospital"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

const ContentWrapper = styled.div`
  max-width: 1500px;
  margin: auto;
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

function App() {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  useEffect(() => {
    getClient().then((client) => setClient(client));
  }, []);

  useEffect(() => {
    window.localStorage.removeItem("apollo-cache-persist");
  }, []);

  if (!client) return null;

  return (
    <ApolloProvider client={client}>
      <Router>
        <GlobalStyle />
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <ContentWrapper>
            <Switch>
              <Route exact path="/about/">
                <AboutPage />
              </Route>
              <Route exact path="/hospital/:hospitalId/">
                <HospitalPage />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/:localityName/" />
              <Route component={NotFoundPage} />
            </Switch>
            <LiveRoute
              exact
              alwaysLive={true}
              path="/:localityName/"
              render={(props) => <LocalityPage {...props} />}
            />
          </ContentWrapper>
        </Suspense>
      </Router>
    </ApolloProvider>
  );
}

export default App;
