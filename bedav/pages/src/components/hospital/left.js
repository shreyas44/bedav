import React from 'react'
import styled from 'styled-components'
import EquipmentSection from './equipmentSection'
import categories from '../extra/categories'

const StyledDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`

const HeadingContainer = styled.div`
  margin: 0 0 25px 0;
  color: #0275b3;
  font-family: "Quicksand", sans-seif;
`

const StyledHeading = styled.h1`
  margin: 0;
  font-size: 24px;
`

const StyledSubHeading = styled.h2`
  margin: 0px 0 0;
  font-size: 14px;
  font-weight: normal;
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
      <HeadingContainer>
        <StyledHeading>{hospital.name}</StyledHeading>
        <StyledSubHeading>{categories[hospital.category]}</StyledSubHeading>
      </HeadingContainer>
      {sections}
    </StyledDiv>
  )
}

export default LeftSection
