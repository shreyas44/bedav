import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin-bottom: 30px;
  width: 100%;
`

function QuestionContainer(props) {
  return (
    <StyledDiv>
      {props.children}
    </StyledDiv>
  )
}

export default QuestionContainer