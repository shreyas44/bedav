import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  font-size: 33px;
  font-family: "Quicksand";
  float: left;
  color: black;
  text-decoration: none;
`

function Heading() {
  return (
    <StyledLink to="/">bedav</StyledLink>
  )
}

export default Heading