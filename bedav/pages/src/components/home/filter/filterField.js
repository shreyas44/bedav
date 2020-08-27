import React, {useContext} from 'react'
import styled from 'styled-components'
import Checkbox from '../../checkbox'
import SelectedFiltersContext from '../../contexts/SelectedFilters'

const StyledDiv = styled.div`
  margin: 0 0 15px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledP = styled.p`
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
    <StyledDiv>
      <Checkbox checked={filters.includes(value)} onClick={() => dispatchFilter({type: value}) }/>
      <StyledP>{children}</StyledP>
    </StyledDiv>
  )
}

export default FilterField
