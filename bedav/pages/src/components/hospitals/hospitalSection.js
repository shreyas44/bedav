import React from 'react'
import styled from 'styled-components'
import HospitalHeader from './hospitalHeader'
import HospitalList from './hospitalList'

const StyledDiv = styled.div`
  margin: 50px auto;
  box-sizing: border-box;
  width: 100%;
  max-width: 1400px;
  display: grid;
  grid-template-columns: repeat(10, auto);
  grid-gap: 5px;
  font-size: 15px;
`

const StyledP = styled.p`
  margin: 0 5px;
  grid-column: 1 / -1;
  color: #aaa;
`

function HospitalSection(props) {
  return (
    <StyledDiv>
      <StyledP>
        Gen - General;
        HDU - High Dependency Unit;
        ICU - Intensive Care Unit;
        Vent - Ventilators
      </StyledP>
      <HospitalHeader />
      <HospitalList />
    </StyledDiv>
  )
}

export default HospitalSection