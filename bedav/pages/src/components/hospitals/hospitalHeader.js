import React from 'react'
import styled from 'styled-components'
import { StyledRow, StyledName, StyledNumber } from './hospitalItem'

const StyledHeadingName = styled(StyledName)`
  padding: 15px;
  display: flex;
  align-items: center;
  text-align: center;

  &:hover {
    font-size: 15px;
    color: #0275b3;
  }
`

const StyledHeading = styled(StyledNumber)`
  font-weight: bold;
  padding: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: #f8f8f8;
  color: ${({counter}) => counter % 2 == 0 ? "#C3423F" : "#08A045"};
`

function HospitalHeader() {

  const fields = [
    'Gen Occupied',
    'Gen Available',
    'HDU Occupied',
    'HDU Available',
    'ICU Used',
    'ICU Available',
    'Vent Used',
    'Vent Available',
  ]

  const headings = fields.map((item, index) => <StyledHeading counter={index} key={index}>{item}</StyledHeading>)

  return (
    <StyledRow>
      <StyledHeadingName counter={2}>Name</StyledHeadingName>
      <StyledHeading style={{color: '#004266'}}>Distance</StyledHeading>
      {/* <StyledHeading counter={1}>Distance</StyledHeading> */}
      {headings}
    </StyledRow>
  ) 
}

export default HospitalHeader