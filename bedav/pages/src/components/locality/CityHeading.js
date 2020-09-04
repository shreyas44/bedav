import React from 'react'
import styled from 'styled-components'

const HeadingContainer = styled.div`
  font-family: "Quicksand", sans-serif;
  color: #415c8a
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
        Bengaluru
      </CityH>
      <LastUpdated>
        Last Updated on 3 Sep, 4:00 AM
      </LastUpdated>
    </HeadingContainer>
  )
}

export default CityHeading
