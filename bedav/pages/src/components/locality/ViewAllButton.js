import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  font-size: 15px;
  text-decoration: none;
  font-family: "Quicksand", sans-serif;
  padding: 8px 15px;
  box-shadow: 0 0 10px #ccc;
  border-radius: 5px;
  cursor: pointer;
  color: black;

  &:hover {
    background-color: #eee;
  }

  &:visited {
    color: black;
  }
`

function ViewAllButton() {
  return (
    <StyledLink to="/">
      View all
    </StyledLink>
  )
}

export default ViewAllButton
