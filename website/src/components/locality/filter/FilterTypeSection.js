import React from 'react'
import styled from 'styled-components'

const FitlerTypeHeading = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 25px;
  font-family: 'Quicksand';
`

const FilterTypeContainer = styled.div`
  margin-top: 30px;

  &:first-child {
    margin-top: 0;
  }
`

const FiltersContainer = styled.div`
  margin: 20px 10px 0;
`

function FilterTypeSection(props) {
  const {name} = props

  return (
    <FilterTypeContainer>
      <FitlerTypeHeading>{name}</FitlerTypeHeading>
      <FiltersContainer>
        {props.children}
      </FiltersContainer>
    </FilterTypeContainer>
  )
}

export default FilterTypeSection

