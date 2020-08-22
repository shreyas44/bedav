import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useLocation } from 'react-router-dom'
import NavBar from './navbar'
import Heading from './heading'

const StyledDiv = styled.div`
  height: fit-content;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px 35px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`

function Header() {
  return (
    <StyledDiv>
      <Heading />
      <NavBar />
    </StyledDiv>
  )
}

export default Header