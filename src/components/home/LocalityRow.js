import React, { useRef } from 'react'
import styled from 'styled-components'
import { createFragmentContainer, graphql } from 'react-relay'
import { Link } from 'react-router-dom'
import { addCommas } from '../extra/funcs'
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited {
    color: inherit;
  }
`

function NumberCell(props) {
  return (
    <StyledCell {...props}>
      {addCommas(props.children)}
    </StyledCell>
  )
}

function LocalityRow(props) {
  const {locality} = props
  console.log(locality)
  const ref = useRef()

  return (
    <Row counter={props.counter}>
      <GridColumnHeader onClick={() => ref.current.click()}>
        <StyledLink ref={ref} onClick={event => event.stopPropagation()} to={`/${locality.name.toLowerCase()}-${locality.state.toLowerCase()}/`}>
          {locality.name}, {locality.state}
        </StyledLink>
      </GridColumnHeader>
      <NumberCell colorTheme="green">
        {locality.available}
      </NumberCell>
      <NumberCell colorTheme="red">
        {locality.occupied}
      </NumberCell>
       <NumberCell colorTheme="total">
        {locality.total}
      </NumberCell>
    </Row>
  )
}

export default LocalityRow

