import React, { Suspense, lazy } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './components/header'
import {BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import NotLiveRoute from 'react-live-route'

const LiveRoute = withRouter(NotLiveRoute)
const HomePage = lazy(() => import('./components/home'))
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

export const FilterContext = React.createContext()

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
          </Switch>
          <LiveRoute exact
            path="/"
            alwaysLive={true}
            render={props => (
              <HomePage {...props}/>  
            )}
          />
        </ContentWrapper>
      </Suspense>
    </Router>
  )
}

export default App
