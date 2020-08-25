import React, { Suspense, lazy } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './components/header'
import {BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import NotLiveRoute from 'react-live-route'

const LiveRoute = withRouter(NotLiveRoute)
const Home = lazy(() => import('./components/home/home'))
const About = lazy(() => import('./components/about/about'))
const Hospital = lazy(() => import('./components/hospital/hospital'))
const FilterScreenProvider = lazy(() => import('./components/contexts/FilterScreenProvider'))

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
              <About />
            </Route>
            <Route exact path="/hospital/:hospitalId/">
              <Hospital />
            </Route>
          </Switch>
          <LiveRoute exact
            path="/"
            alwaysLive={true}
            render={props => (
              <FilterScreenProvider>
                <Home {...props}/>  
              </FilterScreenProvider>
            )}
          />
        </ContentWrapper>
      </Suspense>
    </Router>
  )
}

export default App
