import React from 'react'
import styled from 'styled-components'
import { createFragmentContainer, graphql } from 'react-relay'
import Heading from './Heading'
import Summary from './Summary'

const HeaderContainer = styled.div`
  margin: 0 0 50px;
`

function Header(props) {
  return (
    <HeaderContainer>
      <Heading country={props.country}/>
      <Summary country={props.country}/>
    </HeaderContainer>
  )
}

export default Header
