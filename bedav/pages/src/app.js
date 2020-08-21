import React, {useState} from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './components/header'
import Home from './components/home/home' 
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { FilterScreenProvider } from './components/contexts/FilterScreen'

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
        {/* <Filter filterScreen={filterScreen} setFilterScreen={setFilterScreen} /> */}
      
        <ContentWrapper>
          <Route exact path="/"><Home /></Route>
        </ContentWrapper>
      </FilterScreenProvider>
    </Router>
  )
}

export default App