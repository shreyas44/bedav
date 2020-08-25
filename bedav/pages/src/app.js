import React, { Suspense, lazy } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './components/header'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { FilterScreenProvider } from './components/contexts/FilterScreen'

const Home = lazy(() => import('./components/home/home'))
const About = lazy(() => import('./components/about/about'))
const Hospital = lazy(() => import('./components/hospital/hospital'))

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
      <FilterScreenProvider>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <ContentWrapper>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about/">
              <About />
            </Route>
            <Route path="/hospital/:hospitalId/">
              <Hospital />
            </Route>
          </ContentWrapper>
        </Suspense>
      </FilterScreenProvider>
    </Router>
  )
}

export default App
