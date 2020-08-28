import React, { useEffect, useContext, useState } from 'react'
import FilterSection from './filter/filterSec'
import Hospitals from './hospitals'
import { SelectedFiltersProvider } from '../contexts/SelectedFilters'

function Home(props) {

  useEffect(() => {
    document.title = "Bedav - Home"
  }, [])

  useEffect(() => {
    props.ensureDidMount()
  }, [])

  return (
    <div>
      <SelectedFiltersProvider>
        <Hospitals />
        <FilterSection />
      </SelectedFiltersProvider>
    </div>
  )
}

export default Home
