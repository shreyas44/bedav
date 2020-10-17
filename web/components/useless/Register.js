import React from 'react'
import styled from 'styled-components'
import FormField from './formField'
import Map from './map'

const StyledDiv = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20vh auto 0;
`

function RegisterForm() {
  return (
    <StyledDiv>
      <FormField fieldLabel="Name" required/>
      <FormField fieldLabel="Email" required/>
      <FormField fieldLabel="Phone"/>
      <Map />
    </StyledDiv>
  )
}

export default RegisterForm