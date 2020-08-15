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
`

export const StyledName = styled(StyledItem)`
  min-width: 200px;
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
  flex-grow: 1;
  text-align: right;
  background: ${({counter}) => counter % 2 == 0 ? "#f8f8f8" : "white"};
  color: ${({index}) => index % 2 == 0 ? "#C3423F" : "#08A045"};
`

function HospitalItem(props) {
  let {counter, hospital} = props
  // const {name, ...items} = hospital


  let {name, distance, ...details} = hospital
  details = Object.values(details)
  details = details.map((item, index) => <StyledNumber key={index} index={index} counter={counter}>{item === null ? "N.A." : item}</StyledNumber>)
  return (
    <StyledRow counter={counter}>
      <StyledName counter={counter}>{name}</StyledName>
      <StyledNumber style={{color: '#004266'}} counter={counter}>{distance ? `${distance} km` : "N.A."}</StyledNumber>
      {details}
    </StyledRow>
  )
}

export default createFragmentContainer(
  HospitalItem,
  {
    hospital: graphql`
      fragment hospitalItem_hospital on Hospital {
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
      }
    `
  }
)

// export default HospitalItem