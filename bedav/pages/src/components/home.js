import React, { useReducer } from 'react'
import Filter from './filter/filter'
import Main from './main'

export const SelectedFiltersContext = React.createContext()

function filterReducer(state, action) {
  const filter = action.type
  const includes = state.includes(filter)
  // let new_state = state

  // console.log(state.includes(filter))
  // console.log(includes)
  // console.log(state)

  if (includes) {
    state.splice(state.indexOf(filter), 1)
  } else {
    state.push(filter)
  }

  return [...state]
}

function FiltersProvider(props) {
  const [filters, dispatchFilter] = useReducer(filterReducer, [])

  return <SelectedFiltersContext.Provider value={{filters, dispatchFilter}}>{props.children}</SelectedFiltersContext.Provider>
}


function Home() {
  return (
    <div>
      <FiltersProvider>
        <Main />
        <Filter />
      </FiltersProvider>
    </div>
  )
}

export default Home