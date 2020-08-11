import React from 'react'
import styled from 'styled-components'
import NavOption from './navOption'
import NavBar from './navbar'
import Heading from './heading'
import { useLocation } from 'react-router-dom'

const StyledDiv = styled.div`
  height: fit-content;
  width: 100%;
  /* box-shadow: 0 1px 2px rgba(0,0,0,0.08); */
  position: fixed;
  top: 0;
  padding: 15px 35px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

function Header() {
  let location = useLocation()

  return (
    <StyledDiv>
      <Heading />
      <NavBar>
        <NavOption active={location.pathname === "/register"} to="/register">Register</NavOption>
        <NavOption active={location.pathname === "/login"} to="/login">Log In</NavOption>
      </NavBar>
    </StyledDiv>
  )
}

export default Header