import React, { useState } from 'react'

const SearchHospitalContext = React.createContext()

export function SearchHospitalProvider(props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [focused, setFocus] = useState(false)

  return (
    <SearchHospitalContext.Provider value={{searchQuery, setSearchQuery, focused, setFocus}}>
      {props.children}
    </SearchHospitalContext.Provider>
  )
}

export default SearchHospitalContext
