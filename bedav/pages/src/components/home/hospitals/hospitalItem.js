import React, { useRef } from 'react'
import styled from 'styled-components'
import {graphql, createFragmentContainer} from 'react-relay'
import { Link } from 'react-router-dom'

export const StyledRow = styled.div`
  align-items: center;
  justify-content: space-between;
  color: #555;
  display: contents;
`

export const StyledItem = styled.div`
  padding: 0 20px;
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
`

export const StyledName = styled(StyledItem)`
  font-weight: bold;
  background: #f8f8f8;
  color: #0275b3;
  transition: all 0.1s;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #004266;
    background-color: #eee;
  }
`

export const StyledNumber = styled(StyledItem)`
  text-align: center;
  background: ${({counter}) => counter % 2 == 0 ? "#f8f8f8" : "white"};
  color: ${({colorTheme, children}) => children == "N.A." ? "#ddd" : colorTheme == "green" ? "#008033" : colorTheme === "red" ? "#C3423F" : colorTheme === "blue" ? "rgb(0, 66, 102)": null};
  justify-content: center;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited {
    color: inherit;
  }
`

function HospitalItem(props) {
  const ref = useRef()
  let {counter, hospital} = props

  const hospitalTypes = {
    "pri hos": "Private Hospital",
    "gov hos": "Government Hospital",
    "pri med": "Private Medical College",
    "gov med": "Government Medical College",
    "covid": "Government Covid Care Centre"
  }

  function getNumberObject(firstPart, secondPart, color) {
    if(secondPart === null || secondPart === 0) {
      return <StyledNumber colorTheme={color} counter={counter}>N.A.</StyledNumber>
    }

    return (
      <StyledNumber colorTheme={color} counter={counter}>
        {firstPart}
      </StyledNumber>
    )
  }

  return (
    <StyledRow counter={counter}>
      <StyledName counter={counter} onClick={() => ref.current.click()}><StyledLink to={`/hospital/${hospital.id}/`} ref={ref}>{hospital.name}</StyledLink></StyledName>

      <StyledNumber style={{color: '#004266'}} counter={counter}>{hospitalTypes[hospital.category]}</StyledNumber>

      <StyledNumber style={{color: '#004266'}} counter={counter}>{props.geolocation ? `${hospital.distance} km` : "N.A."}</StyledNumber>

      {
        props.dataToShow === "occupied" ?
        <>
          {getNumberObject(hospital.generalOccupied, hospital.generalTotal, "red")}
          {getNumberObject(hospital.hduOccupied, hospital.hduTotal, "red")}
          {getNumberObject(hospital.icuOccupied, hospital.icuTotal, "red")}
          {getNumberObject(hospital.ventilatorsOccupied, hospital.ventilatorsTotal, "red")}
        </> : props.dataToShow === "available" ?
        <>
          {getNumberObject(hospital.generalAvailable, hospital.generalTotal, "green")}
          {getNumberObject(hospital.hduAvailable, hospital.hduTotal, "green")}
          {getNumberObject(hospital.icuAvailable, hospital.icuTotal, "green")}
          {getNumberObject(hospital.ventilatorsAvailable, hospital.ventilatorsTotal, "green")}
        </> : props.dataToShow == "total" ?
        <>
          {getNumberObject(hospital.generalTotal, hospital.generalTotal, "blue")}
          {getNumberObject(hospital.hduTotal, hospital.hduTotal, "blue")}
          {getNumberObject(hospital.icuTotal, hospital.icuTotal, "blue")}
          {getNumberObject(hospital.ventilatorsTotal, hospital.ventilatorsTotal, "blue")} 
        </>: null
      }
    </StyledRow>
  )
}

export default createFragmentContainer(
  HospitalItem,
  {
    hospital: graphql`
      fragment hospitalItem_hospital on Hospital {
        id
        category
        name
        distance
        generalOccupied
        generalAvailable
        hduOccupied
        hduAvailable
        icuOccupied
        icuAvailable
        ventilatorsOccupied
        ventilatorsAvailable
        generalTotal
        ventilatorsTotal
        icuTotal
        hduTotal
      }
    `
  }
)

// export default HospitalItem
