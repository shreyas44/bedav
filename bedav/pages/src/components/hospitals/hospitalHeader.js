import React from 'react'
import styled from 'styled-components'
import { StyledRow, StyledName, StyledNumber } from './hospitalItem'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

const StyledHeadingName = styled(StyledName)`
  padding: 15px;
  display: flex;
  text-align: left;

  &:hover {
    font-size: 16px;
    background-color: #f8f8f8;
  }
`

const StyledHeading = styled(StyledNumber)`
  font-weight: bold;
  padding: 15px;
  justify-content: center;
  background-color: #f8f8f8;
  color: ${({colorTheme}) => colorTheme === "red" ? "#C3423F" : colorTheme === "green" ? "#08A045" : colorTheme == "blue" ? '#004266' : null};
`

const StyledIcon = styled(ErrorOutlineIcon)`
  margin-left: 5px;
  font-size: 20px !important;
  position: relative;
  bottom: 1.5px;
  color: #e67519;
  cursor: pointer;
`


function HospitalHeader(props) {

  let colorTheme;

  if(props.dataToShow === "occupied") {
    colorTheme = "red"
  } else if(props.dataToShow === "available") {
    colorTheme = "green"
  } else {
    colorTheme = "blue"
  }

  function renderHeading(text1, text2) {
    return (
      <StyledHeading colorTheme={colorTheme}>
        {text1}
        <br/>
        {text2}
      </StyledHeading>
    )
  }

  const items = ["General Ward", "HDU", "ICU", "Ventilators"]
  const headings = items.map((item, index) => renderHeading(item, props.dataToShow[0].toUpperCase() + props.dataToShow.slice(1)))

  return (
    <StyledRow>

      <StyledHeadingName counter={2}>Name</StyledHeadingName>
      <StyledHeading style={{color: '#004266'}}>
        Distance
        {!props.geolocation ? <StyledIcon /> : null}
      </StyledHeading>
      <StyledHeading style={{color: '#004266'}}>Hospital Type</StyledHeading>

      {headings}

    </StyledRow>
  ) 
}

export default HospitalHeader