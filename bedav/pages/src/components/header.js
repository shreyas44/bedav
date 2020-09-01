import React from 'react'
import styled from 'styled-components'
import NavBar from './Navbar'
import Heading from './Heading'

const HeaderContainer = styled.div`
  height: fit-content;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 5px 35px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  z-index: 5;
  box-shadow: 0 1px 5px rgba(0,0,0,0.2);

  @media only screen and (max-width: 600px) {
    padding: 5px 15px 10px;
  }
`

function Header() {
  return (
    <HeaderContainer>
      <Heading />
      <NavBar />
    </HeaderContainer>
  )
}

export default Header
