import React, { Suspense, lazy } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './components/header'
import {BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import NotLiveRoute from 'react-live-route'

const LiveRoute = withRouter(NotLiveRoute)
const HomePage = lazy(() => import('./components/home'))
const LocalityPage = lazy(() => import('./components/locality'))
const AboutPage = lazy(() => import('./components/about'))
const HospitalPage = lazy(() => import('./components/hospital'))

const ContentWrapper = styled.div`
  max-width: 1500px;
  margin: auto;
`

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`

function App() {
return (
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
          </Switch>
          <LiveRoute exact alwaysLive={true}
            path="/:localityName/"
            render={props => (
              <LocalityPage {...props}/>
            )}
          />
        </ContentWrapper>
      </Suspense>
    </Router>
  )
}

export default App
