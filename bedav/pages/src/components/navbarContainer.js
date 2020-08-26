import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  float: right;
  clear: right;
  position: relative;
  top: 2.5px;
`

function NavBar(props) {
  return (
    <StyledDiv>
      {props.children}
    </StyledDiv>
  )
}

export default NavBar
