import React from 'react'
import styled, { css } from 'styled-components'
import {Link, useLocation} from 'react-router-dom'
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
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

function Navbar() {
  const {pathname} = useLocation()


  return (
    <NavBar>
      <Link to="/">
        <StyledIconWrapper active={pathname == "/" ? 1 : 0}>
          <StyledHomeIcon 
            style={{
              fontSize: "2.05em",
              position: "relative",
              top: 3
            }}
          />
        </StyledIconWrapper>
      </Link>

      <Link to="/about/">
        <StyledIconWrapper
          active={pathname == "/about/" ? 1 : 0}
        >
          <StyledAboutIcon 
            style={{fontSize: "1.88em"}}
          />
        </StyledIconWrapper>
      </Link>
    </NavBar>
  )
}

export default Navbar