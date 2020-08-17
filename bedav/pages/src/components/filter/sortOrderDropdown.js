import React, {useState} from 'react'
import Dropdown from './dropdown/dropdown'

function SortOrderDropdown(props) {
  const {values, value, setValue} = props 

  return (
    <Dropdown 
      value={value}
      setValue={setValue}
      values={values}
    />
  )
}

export default SortOrderDropdown