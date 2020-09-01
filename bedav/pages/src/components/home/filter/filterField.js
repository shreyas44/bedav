import React, {useContext} from 'react'
import styled from 'styled-components'
import Checkbox from '../../Checkbox'
import SelectedFiltersContext from '../../contexts/SelectedFilters'

const FilterFieldContainer = styled.div`
  margin: 0 0 15px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`

const FilterFieldText = styled.div`
  margin: 0 0 0 10px;
  font-size: 17px;
  display: inline-block;

  @media only screen and (max-width: 600px) {
    font-size: 15px;
  }
`

function FilterField(props) {
  const {children, value} = props
  const {filters, dispatchFilter} = useContext(SelectedFiltersContext)

  return (
    <FilterFieldContainer>
      <Checkbox checked={filters.includes(value)} onClick={() => dispatchFilter({type: value}) }/>
      <FilterFieldText>{children}</FilterFieldText>
    </FilterFieldContainer>
  )
}

export default FilterField
