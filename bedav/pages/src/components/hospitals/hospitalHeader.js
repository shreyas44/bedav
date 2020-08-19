import React from 'react'
import styled from 'styled-components'
import { StyledRow, StyledName, StyledNumber } from './hospitalItem'

const StyledHeadingName = styled(StyledName)`
  padding: 15px;
  display: flex;
  text-align: left;

  &:hover {
    font-size: 15px;
    color: #0275b3;
  }
`

const StyledHeading = styled(StyledNumber)`
  font-weight: bold;
  padding: 15px;
  justify-content: center;
  background-color: #f8f8f8;
  color: ${({colorTheme}) => colorTheme === "red" ? "#C3423F" : colorTheme === "green" ? "#08A045" : null};
`

function HospitalHeader(props) {

  let colorTheme;
  if(props.dataToShow === "occupied") {
    colorTheme = "red"
  } else {
    colorTheme = "green"
  }

  function renderHeading(text1, text2) {
    return (
      <StyledHeading colorTheme={colorTheme}>
        {text1}
        <br/>
        {text2} / Total
      </StyledHeading>
    )
  }

  return (
    <StyledRow>

      <StyledHeadingName counter={2}>Name</StyledHeadingName>
      <StyledHeading style={{color: '#004266'}}>Distance</StyledHeading>
      <StyledHeading style={{color: '#004266'}}>Hospital Type</StyledHeading>

      {
        props.dataToShow === "occupied" ? 
        <>
          {renderHeading("General Ward", "Occupied")}
          {renderHeading("HDU", "Occupied")}
          {renderHeading("ICU", "Occupied")}
          {renderHeading("Ventilators", "Used")}
        </> : props.dataToShow == "available" ? 
        <>
          {renderHeading("General Ward", "Available")}
          {renderHeading("HDU", "Available")}
          {renderHeading("ICU", "Available")}
          {renderHeading("Ventilators", "Available")} 
        </> : null}

    </StyledRow>
  ) 
}

export default HospitalHeader