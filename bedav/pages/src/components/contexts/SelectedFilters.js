import React, { useReducer } from 'react'

const SelectedFiltersContext = React.createContext()

function filterReducer(state, action) {
  const filter = action.type
  const includes = state.includes(filter)

  if (includes) {
    state.splice(state.indexOf(filter), 1)
  } else {
    state.push(filter)
  }

  return [...state]
}

export function SelectedFiltersProvider(props) {
  const [filters, dispatchFilter] = useReducer(filterReducer, [])

  return (
    <SelectedFiltersContext.Provider value={{filters, dispatchFilter}}>
      {props.children}
    </SelectedFiltersContext.Provider>
  )
}

export default SelectedFiltersContext