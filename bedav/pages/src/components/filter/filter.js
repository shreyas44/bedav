import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import FilterScreenContext from '../contexts/FilterScreen'
import FilterField from './filterField'
import FilterSection from './filterSection'
import SortDropdown from './sortDropdown'
import SortOrderDropdwon from './sortOrderDropdown'

const StyledDiv = styled.div`
  height: 100%;
  width: fit-content;
  padding: 75px 55px 15px 35px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  background: white;
  opacity: ${({filterScreen}) => filterScreen ? 1 : 0};
  transition: opacity 0.2s;
  z-index: ${({filterScreen}) => filterScreen ? -1 : -3};; 
  box-shadow: -10px 0px 10px 1px #ddd;
`

function FilterScreen(props) {
  const {filterScreen} = useContext(FilterScreenContext)
  const {currentDropdown, setCurrentDropdown} = useState()
  const {sortValue, setSortValue} = useState()
  const {sortOrderValue, setSortOrderValue} = useState()

  const sortValues = {
    DISTANCE: "Distance",
    GENERAL_OCCUPIED: "General Ward Occupied",
    HDU_OCCUPIED: "HDU Occupied",
    ICU_OCCUPIED: "ICU Occupied",
    VENTILATORS_USED: "Ventilators Used",
    GENERAL_AVAILABLE: "General Ward Available",
    HDU_AVAILABLE: "HDU Available",
    ICU_AVAILABLE: "ICU Available",
    VENTILATORS_AVAILABLE: "Ventilators Available"
  }

  const sortOrder = {
    ASCENDING: "Increading",
    DESCENDING: "Decreasing"
  }

  const fields = {
    "gov hos": "Government Hospital",
    "gov med": "Government Medical College",
    "pri hos": "Private Hospital",
    "pri med": "Private Medical College",
    "covid": "Covid Care Centres"
  }

  let CategoryFilterFields = Object.keys(fields).map(key => <FilterField key={key} value={key}>{fields[key]}</FilterField>)

  return (
    <StyledDiv filterScreen={filterScreen}>
      <FilterSection name="Sort">
        <SortDropdown />
        <SortOrderDropdwon />
      </FilterSection>
      <FilterSection name="Category">
        {CategoryFilterFields}
      </FilterSection>
    </StyledDiv>
  ) 
}

export default FilterScreen