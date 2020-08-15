import React from 'react'
import styled from 'styled-components'
import {graphql, createFragmentContainer} from 'react-relay'

export const StyledRow = styled.div`
  align-items: center;
  justify-content: space-between;
  color: #555;
  display: contents;
`

export const StyledItem = styled.div`
  padding: 0 20px;
  height: 100%;
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

export const StyledName = styled(StyledItem)`
  /* min-width: 250px;
  max-width: 300px; */
  font-weight: bold;
  background: #f8f8f8;
  color: #0275b3;
  transition: all 0.1s;
  cursor: pointer;

  &:hover {
    font-size: 16px;
    color: #004266;
  }
`

export const StyledNumber = styled(StyledItem)`
  text-align: center;
  background: ${({counter}) => counter % 2 == 0 ? "#f8f8f8" : "white"};
  color: ${({colorTheme}) => colorTheme === "green" ? "#08A045" : colorTheme === "red" ? "#C3423F" : null};
  justify-content: center;
`

const StyledFraction = styled.div`
  position: relative;
  bottom: 3px;
`

const StyledSpan = styled.span`
  font-size: 24px;
  font-weight: 100;
  margin: 0 6px;
  opacity: 0.5;
  position: relative;
  top: 3px;
`

const StyledTotal = styled.div`
  font-weight: bold;
  font-size: 19px;
  display: inline;
  position: relative;
  top: 1px;
`

function HospitalItem(props) {
  let {counter, hospital} = props

  const hospitalTypes = {
    "pri hos": "Private Hospital",
    "gov hos": "Government Hospital",
    "pri med": "Private Medical College",
    "gov med": "Government Medical College",
    "covid": "Government Covid Care Centre"
  }

  function getText(firstPart, secondPart) {
    return (
      <>
        {firstPart}
        <StyledSpan>
          /
        </StyledSpan>
        <StyledTotal>
          {secondPart}
        </StyledTotal>
      </>   
    )
  }

  function getNumberObject(firstPart, secondPart, color) {
    if(secondPart === null || secondPart === 0) {
      return <StyledNumber colorTheme={color} counter={counter}>N.A.</StyledNumber>
    }

    return (
      <StyledNumber colorTheme={color} counter={counter}>
        <StyledFraction>
          {getText(firstPart, secondPart)}
        </StyledFraction>
      </StyledNumber>
    )
  }

  return (
    <StyledRow counter={counter}>
      <StyledName counter={counter}>{hospital.name}</StyledName>

      <StyledNumber style={{color: '#004266'}} counter={counter}>{hospital.distance ? `${hospital.distance} km` : "N.A."}</StyledNumber>

      <StyledNumber style={{color: '#004266'}} counter={counter}>{hospitalTypes[hospital.category]}</StyledNumber>

      {
        props.dataToShow === "occupied" ?
        <>
          {getNumberObject(hospital.generalOccupied, hospital.generalTotal, "red")}
          {getNumberObject(hospital.HDUOccupied, hospital.HDUTotal, "red")}
          {getNumberObject(hospital.ICUOccupied, hospital.ICUTotal, "red")}
          {getNumberObject(hospital.ventilatorsOccupied, hospital.ventilatorsTotal, "red")}
        </> : props.dataToShow === "available" ?
        <>
          {getNumberObject(hospital.generalAvailable, hospital.generalTotal, "green")}
          {getNumberObject(hospital.HDUAvailable, hospital.HDUTotal, "green")}
          {getNumberObject(hospital.ICUAvailable, hospital.ICUTotal, "green")}
          {getNumberObject(hospital.ventilatorsAvailable, hospital.ventilatorsTotal, "green")}
        </> : null
      }
    </StyledRow>
  )
}

export default createFragmentContainer(
  HospitalItem,
  {
    hospital: graphql`
      fragment hospitalItem_hospital on Hospital {
        category
        name
        distance
        generalOccupied
        generalAvailable
        HDUOccupied
        HDUAvailable
        ICUOccupied
        ICUAvailable
        ventilatorsOccupied
        ventilatorsAvailable
        generalTotal
        ventilatorsTotal
        ICUTotal
        HDUTotal
      }
    `
  }
)

// export default HospitalItem