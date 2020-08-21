import React, { useContext } from 'react'
import styled from 'styled-components'
import FilterListIcon from '@material-ui/icons/FilterList'
import FilterScreenContext from '../contexts/FilterScreen'

const IconContainer = styled.div`
  padding: 15px;
  /* height: 40px;
  width: 40px; */
  box-sizing: border-box;
  border-radius: 50%;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  background-color: white;
  box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.7);

  &:hover {
    background-color: #f6f6f6; 
  }
`

const StyledIcon = styled(FilterListIcon)`
  font-size: 1.75rem !important;
  transition: font-size,color 0.1s;
  color: #444;
  display: flex !important;
  align-content: center;
  justify-content: center;

  &:hover {
    color: black;
    /* font-size: 1.9rem !important; */
  }
`

function FilterIcon(props) {
  const {filterScreen, setFilterScreen} = useContext(FilterScreenContext)

  return (
    <IconContainer onClick={() => setFilterScreen(!filterScreen)}>
      <StyledIcon />
    </IconContainer>
  )
}

export default FilterIcon