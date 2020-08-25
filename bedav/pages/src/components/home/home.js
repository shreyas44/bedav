import React, { useEffect, useContext } from 'react'
import Filter from './filter/filter'
import Main from './main'
import { SelectedFiltersProvider } from '../contexts/SelectedFilters'
import FilterScreenContext from '../contexts/FilterScreen'
import FilterIcon from './filter/filterIcon'

function Home(props) {
  const {filterScreen} = useContext(FilterScreenContext)
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
        {filterScreen ?
          <Filter /> : null }
        <FilterIcon />
      </SelectedFiltersProvider>
    </div>
  )
}

export default Home
