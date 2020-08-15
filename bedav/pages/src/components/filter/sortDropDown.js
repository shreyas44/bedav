import React, { useState } from 'react'
import Dropdown from './dropdown/dropdown'

function SortDropdown(props) {
  const values = ["Distance", "General Ward Occupied", "HDU Occupied", "ICU Occupied", "Ventilators Used"]
  const [value, setValue] = useState("Distance")

  return (
    <Dropdown values={values} value={value} setValue={setValue} />
  )
}

export default SortDropdown

