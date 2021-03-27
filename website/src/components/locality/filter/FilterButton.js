import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const IconContainer = styled.div`
  padding: 15px;
  box-sizing: border-box;
  border-radius: 50%;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  background-color: white;
  box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.7);

  &:hover {
    background-color: var(--wild-sand); 
  }
`

const StyledIcon = styled(props => <FontAwesomeIcon icon={faFilter} {...props}/>)`
  font-size: 1.3em !important;
  transition: font-size,color 0.1s;
  color: var(--tundora);
  display: flex !important;
  align-content: center;
  justify-content: center;

  &:hover {
    color: black;
    /* font-size: 1.9rem !important; */
  }
`

function FilterIcon(props) {
  const {filterScreen, setFilterScreen} = props

  return (
    <IconContainer onClick={() => setFilterScreen(!filterScreen)}>
      <StyledIcon />
    </IconContainer>
  )
}

export default FilterIcon