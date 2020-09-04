import React, { useEffect } from 'react'
import styled from 'styled-components'
import { SearchHospitalProvider } from '../contexts/SearchHospital'
import { SelectedFiltersProvider } from '../contexts/SelectedFilters'
import FilterSection from './filter'
import HospitalsTable from './HospitalsTable'
import TopSection from './TopSection'

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
          <TopSection />
          <HospitalsTable />
        </SearchHospitalProvider>
        <FilterSection />
      </SelectedFiltersProvider>
    </div>
  )
}

export default HomePage
