import React, { useReducer } from 'react'

const SelectedFiltersContext = React.createContext()

function filterReducer(state, action) {
  const filter = action.type
  const includes = state.includes(filter)
  let new_state = [...state]

  console.log(state, filter)

  if (includes) {
    new_state.splice(state.indexOf(filter), 1)
  } else {
    new_state.push(filter)
  }

  return [...new_state]
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