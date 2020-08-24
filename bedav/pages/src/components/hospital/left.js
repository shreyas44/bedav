import React from 'react'
import styled from 'styled-components'
import HospitalMap from './map'

const StyledDiv = styled.div`
  width: 100%;
  height: 90vh;
`

function LeftSection(props) {
  return (
    <StyledDiv>
      <HospitalMap />
    </StyledDiv>    
  )
}

export default LeftSection
