import React, { useContext } from 'react'
import styled from 'styled-components'
import SearchBar from './searchBar'
import {SelectedFiltersContext} from './home'

const StyledContainer = styled.div`
  width: 60%;
  box-shadow: 7px 15px 25px 0px rgba(0,0,0,0.1);
  margin: 15vh auto 0;
  height: 60px;
  border: 1px solid #FEFEFE;
  display: flex;
  align-content: center;
  transition: all 0.1s;

  &:focus-within {
    height: 65px;
    width: 61%;
    outline: none;
    box-shadow: 7px 15px 25px rgba(0,0,0,0.3);
  }
`

const StyledDiv = styled.div`
  color: grey;
  position: absolute;
  bottom: 90px;
`

function Middle() {
  const {filters} = useContext(SelectedFiltersContext)

  const fields = {
    "gov hos": "Government Hospital",
    "gov med": "Government Medical College",
    "pri hos": "Private Hospital",
    "pri med": "Private Medical College",
    "covid": "Covid Care Centres"
  }

  let categories;
  if (filters.length > 0) {
    categories =
      <StyledDiv>
        Categories: {filters.map(item => fields[item]).join(', ')}
      </StyledDiv>
  }

  return (
    <StyledContainer>
      {categories}
      <SearchBar />
    </StyledContainer>
  )
}

export default Middle