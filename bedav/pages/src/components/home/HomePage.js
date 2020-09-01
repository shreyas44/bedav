import React, { useEffect } from 'react'
import styled from 'styled-components'
import { SearchHospitalProvider } from '../contexts/SearchHospital'
import { SelectedFiltersProvider } from '../contexts/SelectedFilters'
import FilterSection from './filter'
import HospitalsTable from './HospitalsTable'
import SearchBar from './SearchBar'

const MainContainer = styled.div`
  width: 100%;
  padding: 15px 35px;
  box-sizing: border-box;
  margin: 60px 0 0;
  background: white;
  transition: opacity 0.2s;
  z-index: -2;

  @media only screen and (max-width: 600px) {
    padding: 10px;
  }
`

function HomePage(props) {

  useEffect(() => {
    document.title = "Bedav - Home"
  }, [])

  useEffect(() => {
    props.ensureDidMount()
  }, [])

  return (
    <div>
      <SelectedFiltersProvider>
        <SearchHospitalProvider>
          <MainContainer>
            <SearchBar />
          </MainContainer>
          <HospitalsTable />
        </SearchHospitalProvider>
        <FilterSection />
      </SelectedFiltersProvider>
    </div>
  )
}

export default HomePage
