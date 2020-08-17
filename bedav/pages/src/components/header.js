import React, { useState, useContext } from 'react'
import styled, { css } from 'styled-components'
import NavBar from './navbar'
import Heading from './heading'
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
// import Filter from './filter'
import FilterScreenContext from './contexts/FilterScreen'

const StyledDiv = styled.div`
  height: fit-content;
  width: 100%;
  /* box-shadow: 0 1px 2px rgba(0,0,0,0.08); */
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px 35px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledIcon = css`
  font-size: 1.75rem !important;
  cursor: pointer;
  transition: font-size,color 0.1s;
  color: #444;

  &:hover {
    color: black;
    font-size: 1.9rem !important;
  }
`

const StyledFilterIcon = styled(FilterListIcon)`
  ${StyledIcon}
`

const StyledCloseIcon = styled(CloseIcon)`
  ${StyledIcon}
`

function Header() {
  const context = useContext(FilterScreenContext)

  const Icon = context.filterScreen ? StyledCloseIcon : StyledFilterIcon

  return (
    <StyledDiv>
      <Heading />
      <NavBar>
        <Icon onClick={() => { context.setFilterScreen(!context.filterScreen) } } />
      </NavBar>
    </StyledDiv>
  )
}

export default Header