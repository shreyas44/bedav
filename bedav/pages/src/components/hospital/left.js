import React from 'react'
import styled from 'styled-components'
import EquipmentSection from './equipmentSection'

const StyledDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`

const StyledHeading = styled.h1`
  margin: 0 0 20px 0;
  font-size: 24px;
  color: #0275b3;
  font-family: "Quicksand", sans-serif;
`

function LeftSection(props) {
  const {hospital} = props
  const values = {
    "General Ward": {
      available: "N.A.",
      occupied: "N.A.",
      total: "N.A."
    },
    "High Dependency Unit": {
      available: "N.A.",
      occupied: "N.A.",
      total: "N.A."
    },
    "Intensive Care Unit": {
      available: "N.A.",
      occupied: "N.A.",
      total: "N.A."
    },
    "Ventilators": {
      available: "N.A.",
      occupied: "N.A.",
      total: "N.A."
    }
  }
  
  if(hospital.generalTotal !== null && hospital.generalTotal > 0) {
    values["General Ward"] = {
      available: hospital.generalAvailable,
      occupied: hospital.generalOccupied,
      total: hospital.generalTotal
    }
  }

  if(hospital.hduTotal !== null && hospital.hduTotal > 0) {
    values["High Dependency Unit"] = {
      available: hospital.hduAvailable,
      occupied: hospital.hduOccupied,
      total: hospital.hduTotal
    }
  }

  if(hospital.icuTotal !== null && hospital.icuTotal > 0) {
    values["Intensive Care Unit"] = {
      available: hospital.icuAvailable,
      occupied: hospital.icuOccupied,
      total: hospital.icuTotal
    }
  }

  if(hospital.ventilatorsTotal !== null && hospital.ventilatorsTotal > 0) {
    values["Ventilators"] = {
      available: hospital.ventilatorsAvailable,
      occupied: hospital.ventilatorsOccupied,
      total: hospital.ventilatorsTotal
    }
  }
 
  const sections = Object.keys(values).map((value, index) => <EquipmentSection key={index} sectionName={value} values={values[value]} /> )

  console.log(sections)

  return (
    <StyledDiv>
      <StyledHeading>{hospital.name}</StyledHeading>
      {sections}
    </StyledDiv>
  )
}

export default LeftSection
