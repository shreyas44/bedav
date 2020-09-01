import React from 'react'
import styled, { css } from 'styled-components'
import {Link, useLocation} from 'react-router-dom'
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import NavBar from './navbarContainer'
import Tooltip from './Tooltip'

const StyledIconWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  color: ${({active}) => active ? "#0275b3" : "#444"};
  margin-left: 10px;

  &:hover {
    color: #0275b3;
  }
`

export const StyledIcon = css`
  font-size: 2em;
  cursor: pointer;
  transition: font-size,color 0.1s;
  color: #444;
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
      <Tooltip text="Home" position="bottom">
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
      </Tooltip>
      
      <Tooltip text="About" position="bottom">
        <Link to="/about/">
          <StyledIconWrapper
            active={pathname == "/about/" ? 1 : 0}
          >
            <StyledAboutIcon 
              style={{fontSize: "1.88em"}}
            />
          </StyledIconWrapper>
        </Link>
      </Tooltip>
    </NavBar>
  )
}

export default Navbar
