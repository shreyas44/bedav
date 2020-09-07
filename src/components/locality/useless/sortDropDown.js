import React, { useState } from 'react'
import Dropdown from './dropdown/dropdown'

function SortDropdown(props) {
  const {values, value, setValue} = props

  return (
    <Dropdown values={values} value={value} setValue={setValue} />
  )
}

export default SortDropdown

