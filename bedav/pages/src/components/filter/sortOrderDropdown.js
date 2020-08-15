import React, {useState} from 'react'
import Dropdown from './dropdown/dropdown'

function SortOrderDropdown(props) {
  const [value, setValue] = useState("Increasing")
  const values = ['Increasing', "Decreasing"]

  return (
    <Dropdown 
      value={value}
      setValue={setValue}
      values={values}
    />
  )
}

export default SortOrderDropdown