import React from 'react'
import styled from 'styled-components'
import { CityH as CountryHeading, LastUpdated } from '../locality/CityHeading'
import { getFormattedTimestamp } from '../extra/funcs'

const HeadingContainer = styled.div`
  margin: 0 auto;
  color: #415c8a;
  text-align: center;
`

function Heading(props) {
  return (
    <HeadingContainer>
      <CountryHeading>India</CountryHeading>
      <LastUpdated>Last Updated on {getFormattedTimestamp(props.country.lastUpdated)}</LastUpdated>
    </HeadingContainer>
  )
}

export default Heading
