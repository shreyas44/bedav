import React, { useReducer } from 'react'
import Filter from './filter/filter'
import Main from './main'
import { SelectedFiltersProvider } from './contexts/SelectedFilters'

function Home() {
  return (
    <div>
      <SelectedFiltersProvider>
        <Main />
        <Filter />
      </SelectedFiltersProvider>
    </div>
  )
}

export default Home