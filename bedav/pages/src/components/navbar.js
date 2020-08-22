import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import {useLocation} from 'react-router-dom'
import HelpOutlinedIcon from '@material-ui/icons/HelpOutline';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NavBar from './navbarContainer'

const StyledIconWrapper = styled.div`
  display: inline-block;
  margin-left: 0px;
  cursor: pointer;
  color: ${({active}) => active ? "#0275b3" : "#444"};

  &:hover {
    color: #0275b3;
  }
`

export const StyledIcon = css`
  font-size: 2em;
  cursor: pointer;
  transition: font-size,color 0.1s;
  color: #444;
  margin-left: 10px;
  color: inherit;
`

const StyledHomeIcon = styled(HomeIcon)`
  ${StyledIcon}
`

const StyledAboutIcon = styled(HelpIcon)`
  ${StyledIcon}
`

function Navbar(props) {
  const {pathname} = useLocation()


  return (
    <NavBar>
      <StyledIconWrapper active={pathname == "/" ? 1 : 0}>
        <StyledHomeIcon 
          style={{
            fontSize: "2.05em",
            position: "relative",
            top: 3
          }}
        />
      </StyledIconWrapper>

      <StyledIconWrapper
        // style={{position: "relative", bottom: 3}}
        active={pathname == "/about" ? 1 : 0}
      >
        <StyledAboutIcon 
          style={{fontSize: "1.88em"}}
        />
      </StyledIconWrapper>
    </NavBar>
  )
}

export default Navbar