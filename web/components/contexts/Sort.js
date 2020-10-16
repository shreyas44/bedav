import React, { useState } from 'react'

const SortContext = React.createContext()

export function SortProvider(props) {
  const {initial} = props
  const [sortValue, setSortValue] = useState({field: initial.field || "generalAvailable", descending: initial.descending != undefined ? initial.descending : true})

  return (
    <SortContext.Provider value={{sortValue, setSortValue}}>
      {props.children}
    </SortContext.Provider>
  )
}

export default SortContext
