import React from 'react'
import styled from 'styled-components'
import SearchBar from './searchBar'

const StyledContainer = styled.div`
  width: 60%;
  box-shadow: 7px 15px 25px 0px rgba(0,0,0,0.1);
  margin: 5vh auto 0;
  height: 60px;
  border: 1px solid #FEFEFE;
  display: flex;
  align-content: center;
  transition: all 0.1s;
  position: relative;

  &:focus-within {
    height: 65px;
    width: 61%;
    outline: none;
    box-shadow: 7px 15px 25px rgba(0,0,0,0.3);
  }
`

function Middle() {
  return (
    <StyledContainer>
      <SearchBar />
    </StyledContainer>
  )
}

export default Middle