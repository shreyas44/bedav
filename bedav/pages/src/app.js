import React from 'react'
import styled from 'styled-components'
import Header from './components/header'
import SearchBar from './components/searchBar'
import RegisterForm from './components/register'
import LoginForm from './components/login'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const ContentWrapper = styled.div`
  max-width: 1500px;
  margin: auto;
`

const MainContainer = styled.div`
  font-family: 'Roboto', sans-serif;
`

function App() {
  return (
    <MainContainer>
      <Router>
        <Header />
        <ContentWrapper>
          <Route exact path="/"><SearchBar /></Route>
          <Route exact path="/register"><RegisterForm /></Route>
          <Route exact path="/login"><LoginForm /></Route>
        </ContentWrapper>
      </Router>
    </MainContainer>
  )
}

export default App