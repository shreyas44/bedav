import React, { useEffect } from 'react'
import Filter from '../filter/filter'
import Main from './main'
import { SelectedFiltersProvider } from '../contexts/SelectedFilters'
import { SortProvider } from '../contexts/Sort'
import FilterIcon from '../filter/filterIcon'

function Home() {
  useEffect(() => {
    document.title = "Bedav - Home"
  }, [])

  return (
    <div>
      <SelectedFiltersProvider>
        <SortProvider>
          <Main />
          <Filter />
        </SortProvider>
        <FilterIcon />
      </SelectedFiltersProvider>
    </div>
  )
}

export default Home