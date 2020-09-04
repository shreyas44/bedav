import React from 'react'
import styled from 'styled-components'
import { createFragmentContainer, graphql } from 'react-relay'
import SearchBar from './SearchBar'
import CityHeading from './CityHeading'
import ViewAllButton from './ViewAllButton'

const TopContainer = styled.div`
  margin: 100px auto 0;
  width: 60%;

  @media only screen and (max-width: 600px) {
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
  }
`

const CityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

function TopSection({locality}) {
  return (
    <TopContainer>
      <CityContainer>
        <CityHeading lastUpdated={locality.lastUpdated}>
          {locality.name}
        </CityHeading>
        <ViewAllButton />
      </CityContainer>
      <SearchBar />
    </TopContainer>
  )
}

export default createFragmentContainer(
  TopSection,
  {
    locality: graphql`
      fragment TopSection_locality on Locality {
        id
        name
        total
        occupied
        available
        lastUpdated
      }
    `
  }
)
