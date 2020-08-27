import React, { useState } from 'react'
import Filter from './filter'
import FilterIcon from './filterIcon'

function FilterSection() {
  const [filterScreen, setFilterScreen] = useState(false) 

  return (
    <>
      {
        filterScreen ?
        <Filter filterScreen={filterScreen} setFilterScreen={setFilterScreen}/> :
        null
      }
      <FilterIcon filterScreen={filterScreen} setFilterScreen={setFilterScreen} />
    </>
  )
}

export default FilterSection