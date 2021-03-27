import React from 'react'
import styled, { css } from 'styled-components'
import {Link, useLocation} from 'react-router-dom'
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from './Tooltip'

const NavbarContainer = styled.div`
  float: right;
  clear: right;
  position: relative;
  top: 2.5px;
`

const StyledIconWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  color: ${({ active }) => active ? "var(--deep-cerulean)" : "var(--tundora)"};
  margin-left: 10px;

  &:hover {
    color: var(--deep-cerulean);
  }
`

export const StyledIcon = css`
  font-size: 2em;
  cursor: pointer;
  transition: font-size,color 0.1s;
  color: var(--tundora);
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
    <NavbarContainer>
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
    </NavbarContainer>
  )
}

export default Navbar
