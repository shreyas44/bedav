import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  font-size: 33px;
  font-family: "Quicksand";
  float: left;
  color: black;
  text-decoration: none;
  margin: 0;
  font-weight: bold;
`

function Heading() {
  return <StyledLink to="/">bedav</StyledLink>
}

export default Heading