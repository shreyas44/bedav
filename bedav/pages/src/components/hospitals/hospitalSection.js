import React from 'react'
import styled from 'styled-components'
import HospitalHeader from './hospitalHeader'
import HospitalList from './hospitalList'

const StyledDiv = styled.div`
  margin: 50px auto;
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(8, auto);
  grid-gap: 5px;
`

function HospitalSection(props) {
  return (
    <StyledDiv>
      <HospitalHeader />
      <HospitalList />
    </StyledDiv>
  )
}

export default HospitalSection