import React, { useState } from 'react'
import FilterScreen from './FilterScreen'
import FilterButton from './FilterButton'

function FilterSection() {
  const [filterScreen, setFilterScreen] = useState(false) 

  return (
    <>
      {
        filterScreen ?
        <FilterScreen filterScreen={filterScreen} setFilterScreen={setFilterScreen}/> :
        null
      }
      <FilterButton filterScreen={filterScreen} setFilterScreen={setFilterScreen} />
    </>
  )
}

export default FilterSection