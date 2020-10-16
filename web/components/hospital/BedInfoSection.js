import React from 'react'
import styled from 'styled-components'
import data from '../extra/data'
import BedTypeSection from './BedTypeSection'
import HospitalHeading from './HospitalHeading'

const BedInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  order: 1;

  @media only screen and (max-width:600px) {
    order: 2;
  }
`

const StyledHospitalHeading = styled(HospitalHeading)`
  display: none;

  @media only screen and (min-width: 600px) {
    display: block;
  }
`

function BedInfo(props) {
  const {hospital} = props
  const key = `${hospital.locality.name.toLowerCase()}-${hospital.locality.state.toLowerCase()}`
  const columns = data.columns[key]
  const values = {
    "General Ward": {
      available: "N.A.",
      occupied: "N.A.",
      total: "N.A."
    },
    "General Ward with Oxygen (O2)": {
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
    },
  }

  // check for columns
  
  if (!columns.includes("general")) {
    delete values["General Ward"]
  }

  if (!columns.includes("oxygen")) {
    delete values["General Ward with Oxygen (O2)"]
  }

  if (!columns.includes("icu")) {
    delete values["Intensive Care Unit"]
  }

  if (!columns.includes("hdu")) {
    delete values["High Dependency Unit"]
  }

  if (!columns.includes("ventilator")) {
    delete values["Ventilators"]
  }
 
  // check if null
  
  if(hospital.generalTotal !== null && hospital.generalTotal > 0) {
    values["General Ward"] = {
      available: hospital.generalAvailable,
      occupied: hospital.generalOccupied,
      total: hospital.generalTotal
    }
  }

  if(hospital.oxygenTotal !== null && hospital.oxygenTotal > 0) {
    values["General Ward with Oxygen (O2)"] = {
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
 
  const sections = Object.keys(values).map((value, index) => <BedTypeSection key={index} sectionName={value} values={values[value]} /> )

  return (
    <BedInfoContainer>
      <StyledHospitalHeading hospital={hospital}/> 
      {sections}
    </BedInfoContainer>
  )
}

export default BedInfo 
