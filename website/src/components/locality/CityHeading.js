import React from 'react'
import styled from 'styled-components'
import { getFormattedTimestamp } from '../extra/funcs'

const HeadingContainer = styled.div`
  font-family: "Quicksand", sans-serif;
  color: var(--east-bay)
`

export const CityH = styled.h1`
  font-size: 26px;
  font-family: "Quicksand", sans-serif;
  margin: 0;
`

export const LastUpdated = styled.p`
  font-size: 14px;
  margin: 0px 0;
`

function CityHeading(props) {
 
  return (
    <HeadingContainer>
      <CityH>
        {props.children} 
      </CityH>
      <LastUpdated>
        Last Updated on {getFormattedTimestamp(props.lastUpdated)}
      </LastUpdated>
    </HeadingContainer>
  )
}

export default CityHeading
