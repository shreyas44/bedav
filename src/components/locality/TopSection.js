import React, { useContext } from 'react'
import styled from 'styled-components'
import { createFragmentContainer, graphql } from 'react-relay'
import SearchBar from './SearchBar'
import CityHeading from './CityHeading'
import ViewAllButton from './ViewAllButton'
import Summary from './Summary'
import SearchContext from '../contexts/SearchHospital'

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

const InfoContainer = styled.div`
  width: 70%;
  margin: 30px auto 0px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

function TopSection({locality}) {
  const {searchQuery} = useContext(SearchContext)
  return (
    <TopContainer>
      <SearchBar />
      <InfoContainer>
        <CityContainer>
          <CityHeading lastUpdated={locality.lastUpdated}>
            {locality.name}
          </CityHeading>
          <ViewAllButton />
        </CityContainer>
        { searchQuery.length == 0 ?
          <Summary locality={locality}/> : null }
      </InfoContainer>
    </TopContainer>
  )
}

export default TopSection
