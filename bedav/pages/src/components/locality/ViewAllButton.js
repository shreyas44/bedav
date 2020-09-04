import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.div`
  font-size: 15px;
  font-family: "Quicksand", sans-serif;
  padding: 8px 15px;
  box-shadow: 0 0 10px #ccc;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`

function ViewAllButton() {
  return (
    <StyledButton>
      View all
    </StyledButton>
  )
}

export default ViewAllButton
