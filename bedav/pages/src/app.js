import React, {useState} from 'react'
import styled from 'styled-components'
import Header from './components/header'
import Home from './components/home' 
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { FilterScreenProvider } from './components/contexts/FilterScreen'

const ContentWrapper = styled.div`
  max-width: 1500px;
  margin: auto;
`

const MainContainer = styled.div`
  font-family: 'Roboto', sans-serif;
`

export const FilterContext = React.createContext()

function App() {
  return (
    <MainContainer>
      <Router>
        <FilterScreenProvider>
          <Header />
          {/* <Filter filterScreen={filterScreen} setFilterScreen={setFilterScreen} /> */}
        
          <ContentWrapper>
            <Route exact path="/"><Home /></Route>
          </ContentWrapper>
        </FilterScreenProvider>
      </Router>
    </MainContainer>
  )
}

export default App