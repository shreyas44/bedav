import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { FilterContext } from '../App'

const StyledH = css`
  font-size: 33px;
  font-family: "Quicksand";
  float: left;
  color: black;
  text-decoration: none;
  margin: 0;
  font-weight: bold;
`

const StyledLink = styled(Link)`
  ${StyledH}
`

const StyledHeading = styled.h1`
  ${StyledH}
`

function Heading() {
  const {filterScreen} = useContext(FilterContext)

  if(filterScreen) {
    return <StyledHeading>Filter</StyledHeading>
  } else {
    return (
      <StyledLink to="/">bedav</StyledLink>
    )
  }
}

export default Heading