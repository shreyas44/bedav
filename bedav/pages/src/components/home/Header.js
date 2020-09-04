import React from 'react'
import styled from 'styled-components'
import { CityH as Heading, LastUpdated } from '../locality/CityHeading'

const HeadingContainer = styled.div`
  margin: 0 auto;
  color: #415c8a;
  text-align: center;
`

function Header(props) {
  return (
    <HeadingContainer>
      <Heading>India</Heading>
      <LastUpdated>Last Updated on 3 Sep, 3:00 AM</LastUpdated>
    </HeadingContainer>
  )
}

export default Header
