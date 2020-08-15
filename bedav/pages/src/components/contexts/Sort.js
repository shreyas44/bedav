import React, { useState } from 'react'

const SortContext = React.createContext()

export function SortProvider(props) {
  const [sortValue, setSortValue] = useState({field: "distance", order: "descending"})

  return (
    <SortContext.Provider value={{sortValue, setSortValue}}>
      {props.children}
    </SortContext.Provider>
  )
}

export default SortContext