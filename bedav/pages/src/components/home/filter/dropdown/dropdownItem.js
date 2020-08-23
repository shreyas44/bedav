import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  padding: 11px 10px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`

function DropdownItem(props) {
  return (
    <StyledDiv onClick={props.onClick} value={props.value}>
      {props.children}
    </StyledDiv>
  )
}

export default DropdownItem