import React, { useState } from 'react'

const FilterScreenContext = React.createContext()

export function FilterScreenProvider(props) {
  const [filterScreen, setFilterScreen] = useState(false)

  return (
    <FilterScreenContext.Provider value={{filterScreen, setFilterScreen}}>
      {props.children}
    </FilterScreenContext.Provider>
  )
}

export default FilterScreenContext
