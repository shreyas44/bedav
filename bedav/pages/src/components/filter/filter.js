import React, {useContext} from 'react'
import styled from 'styled-components'
import FilterScreenContext from '../contexts/FilterScreen'
import FilterField from './filterField'
import FilterSection from './filterSection'

const StyledDiv = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  padding: 15px 35px;
  box-sizing: border-box;
  position: fixed;
  top: 60px;
  left: 0;
  margin: 0 20px;
  background: white;
  opacity: ${({filterScreen}) => filterScreen ? 1 : 0};
  transition: opacity 0.2s;
  z-index: ${({filterScreen}) => filterScreen ? 1 : -1}; 
`

function FilterScreen(props) {
  const {filterScreen} = useContext(FilterScreenContext)

  const fields = {
    "gov hos": "Government Hospital",
    "gov med": "Government Medical College",
    "pri hos": "Private Hospital",
    "pri med": "Private Medical College",
    "covid": "Covid Care Centres"
  }

  let FilterFields = Object.keys(fields).map(key => <FilterField key={key} value={key}>{fields[key]}</FilterField>)

  return (
    <StyledDiv filterScreen={filterScreen}>
      <FilterSection name="Category">
        {FilterFields}
      </FilterSection>
    </StyledDiv>
  ) 
}

export default FilterScreen