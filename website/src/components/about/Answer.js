import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  font-size: 16px;
  margin-top: 3px;
  line-height: 1.3em;
`

function Answer(props) {
  return (
    <StyledDiv dangerouslySetInnerHTML={{__html: props.children}} />
  )  
}

export default Answer