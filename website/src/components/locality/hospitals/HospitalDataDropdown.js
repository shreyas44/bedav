import React, { useContext } from 'react'
import styled from 'styled-components'
import DataToShowContext from '../../contexts/DataToShow'
import Dropdown from '../dropdown/Dropdown'

const StyledDropdown = styled(Dropdown)`
  width: 50%;
  min-width: 100px;
  max-width: 150px;
  box-sizing: border-box;
`

function HospitalDataDropdown() {
  const {dataToShow, setDataToShow} = useContext(DataToShowContext)
  const values = {
    available: "Available",
    occupied: "Occupied",
    total: "Total"
  }

  function handleClick(newValue) {
    if (newValue != dataToShow) {
      setDataToShow(newValue)
    }
  }

  return (
    <StyledDropdown items={values} initialItem={dataToShow} handleClick={handleClick}/>
  )
}

export default HospitalDataDropdown
