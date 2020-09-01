import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: #333;
`

function Question(props) {
  return (
    <StyledDiv>
      {props.children}
    </StyledDiv>
  )
}

export default Question