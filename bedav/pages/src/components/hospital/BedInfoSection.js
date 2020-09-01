import React from 'react'
import styled from 'styled-components'
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
 
  const sections = Object.keys(values).map((value, index) => <BedTypeSection key={index} sectionName={value} values={values[value]} /> )

  return (
    <BedInfoContainer>
      <StyledHospitalHeading hospital={props.hospital}/> 
      {sections}
    </BedInfoContainer>
  )
}

export default BedInfo 
