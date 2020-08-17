import React, { useReducer } from 'react'
import Filter from './filter/filter'
import Main from './main'
import { SelectedFiltersProvider } from './contexts/SelectedFilters'
import { SortProvider } from './contexts/Sort'

function Home() {
  return (
    <div>
      <SelectedFiltersProvider>
        <SortProvider>
          <Main />
          <Filter />
        </SortProvider>
      </SelectedFiltersProvider>
    </div>
  )
}

export default Home