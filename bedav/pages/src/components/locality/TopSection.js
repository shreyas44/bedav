import React from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import CityHeading from './CityHeading'
import ViewAllButton from './ViewAllButton'

const TopContainer = styled.div`
  margin: 100px auto 0;
  width: 60%;
`

const CityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

function TopSection() {
  return (
    <TopContainer>
      <CityContainer>
        <CityHeading>
          Bangalore
        </CityHeading>
        <ViewAllButton />
      </CityContainer>
      <SearchBar />
    </TopContainer>
  )
}

export default TopSection
