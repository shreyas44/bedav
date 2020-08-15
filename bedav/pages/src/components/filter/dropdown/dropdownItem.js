import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  font-size: 17px;
  font-weight: 100;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`

function DropdownItem(props) {
  return (
    <StyledDiv onClick={props.onClick}>
      {props.children}
    </StyledDiv>
  )
}

export default DropdownItem