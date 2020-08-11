import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  font-size: 15px;
  color: black;
  border-radius: 5px;
  max-width: 100px;
  margin: 10px 10px 10px 0;
  padding: 10px 20px;
  display: inline-block;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.active ? "white" : "#006c67"};
  ${props => props.active ? "background-color: #006C67;" : null}

  &:hover {
    background: #006C67;
    color: white;
    box-shadow: none;
  }
`

function NavOption(props) {
  return (
    <StyledLink active={props.active} to={props.to}>
      {props.children}
    </StyledLink>
  )
}

export default NavOption