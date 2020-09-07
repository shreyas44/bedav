import React, { useState } from 'react'

const SearchHospitalContext = React.createContext()

export function SearchHospitalProvider(props) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <SearchHospitalContext.Provider value={{searchQuery, setSearchQuery}}>
      {props.children}
    </SearchHospitalContext.Provider>
  )
}

export default SearchHospitalContext