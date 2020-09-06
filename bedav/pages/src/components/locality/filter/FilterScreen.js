import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import { useCategories, useMobileCategories } from '../../hooks'
import FilterField from './FilterField'
import FilterTypeSection from './FilterTypeSection'

const FilterSectionContainer = styled.div`
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
  z-index: ${({filterScreen}) => filterScreen ? 3 : -3};; 
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
  
  const [categories, mobileCategories] = [useCategories(), useMobileCategories()]
  let CategoryFilterFields = Object.keys(categories).map(key => <FilterField key={key} value={key}>{categories[key]} ({mobileCategories[categories[key]]})</FilterField>)

  return (
    <FilterSectionContainer filterScreen={filterScreen} ref={div => ref.current = div}>
      <FilterTypeSection name="Category">
        {CategoryFilterFields}
      </FilterTypeSection>
    </FilterSectionContainer>
  ) 
}

export default FilterScreen
