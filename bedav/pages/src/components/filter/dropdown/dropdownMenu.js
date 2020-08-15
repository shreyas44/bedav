import React from 'react'
import styled from 'styled-components'
import DropdownItem from './dropdownItem'

const StyledDropdownMenu = styled.div`
  background-color: #f7f7f7;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 51px;
  display: ${({open}) => open ? "block" : "none"};

  &::before {
    content: '';
    box-shadow: 0px 8px 24px 0px rgba(0,0,0,0.2);
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  /* transition: all 0.1s; */
`

function DropdownMenu(props) {
  const {values, onClick} = props
  
  const items = values.map((value, index) => <DropdownItem key={index} onClick={onClick}>{value}</DropdownItem>)

  return (
    <StyledDropdownMenu open={props.open}>
      {items}
    </StyledDropdownMenu>
  ) 
}

export default DropdownMenu