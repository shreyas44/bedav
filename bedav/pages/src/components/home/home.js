import React, { useEffect, useContext, useState } from 'react'
import FilterSection from './filter/filterSec'
import Main from './main'
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
        <Main />
        <FilterSection />
      </SelectedFiltersProvider>
    </div>
  )
}

export default Home
