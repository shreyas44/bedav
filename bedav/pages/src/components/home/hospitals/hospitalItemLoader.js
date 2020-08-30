import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
 height: 20px;
 padding: 15px;
`

function HospitalItemLoader() {
  return (
    <div style={{display: "contents"}}>
      <StyledDiv />
      <StyledDiv />
      <StyledDiv />
      <StyledDiv />
      <StyledDiv />
      <StyledDiv />
      <StyledDiv />
    </div>
  )
}

export default HospitalItemLoader
