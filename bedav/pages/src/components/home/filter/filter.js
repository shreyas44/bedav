import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import FilterField from './filterField'
import FilterSection from './filterSection'
import fields, { mobileCategories } from '../../extra/categories'

const StyledDiv = styled.div`
  max-height: 50%;
  width: fit-content;
  max-width: 80%;
  padding: 35px 35px 40px;
  box-sizing: border-box;
  position: fixed;
  right: 30px;
  bottom: 100px;
  background: white;
  opacity: ${({filterScreen}) => filterScreen ? 1 : 0};
  transition: opacity 0.2s;
  z-index: ${({filterScreen}) => filterScreen ? -1 : -3};; 
  box-shadow: 0 10px 20px rgba(0,0,0,0.6);
  border-radius: 20px;
  overflow-y: scroll;

  @media only screen and (max-width: 600px) {
    padding: 25px 25px 30px;
  }
`

function FilterScreen(props) {
  const {filterScreen, setFilterScreen} = props
  let ref = useRef()

  function handleClick(event) {
    if(ref.current.contains(event.target)) {
      return
    }

    setFilterScreen(false)  
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    
    return () => {
      document.removeEventListener('click', handleClick)  
    }
  }, [])

  let CategoryFilterFields = Object.keys(fields).map(key => <FilterField key={key} value={key}>{fields[key]} ({mobileCategories[fields[key]]})</FilterField>)

  return (
    <StyledDiv filterScreen={filterScreen} ref={div => ref.current = div}>
      <FilterSection name="Category">
        {CategoryFilterFields}
      </FilterSection>
    </StyledDiv>
  ) 
}

export default FilterScreen
