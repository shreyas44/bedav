import React from 'react'
import styled from 'styled-components'
import { createFragmentContainer, graphql } from 'react-relay'
import { GridCell, GridColumnHeader } from '../grid'

const Row = styled.div`
  display: contents;

  & > div {
    background-color: ${({counter}) => counter % 2 == 0 ? "white" : "#f8f8f8"}
  }
`

const StyledCell = styled(GridCell)`
  display: flex;
  justify-content: center;
`

function LocalityRow(props) {
  const {locality} = props

  return (
    <Row counter={props.counter}>
      <GridColumnHeader>
        {locality.name}, {locality.state}
      </GridColumnHeader>
      <StyledCell colorTheme="green">
        {locality.available}
      </StyledCell>
      <StyledCell colorTheme="red">
        {locality.available}
      </StyledCell>
       <StyledCell colorTheme="total">
        {locality.total}
      </StyledCell>
    </Row>
  )
}

export default createFragmentContainer(
  LocalityRow, 
  {
    locality: graphql`
      fragment LocalityRow_locality on Locality {
        id
        name
        state
        total
        available
        occupied
      }
    `
  }
)


