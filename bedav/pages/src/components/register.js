import React from 'react'
import styled from 'styled-components'
import FormField from './formField'

const StyledDiv = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20vh auto 0;
`

function RegisterForm() {
  return (
    <StyledDiv>
      <FormField fieldLabel="Name" required/>
      <FormField fieldLabel="Email" required/>
      <FormField fieldLabel="Phone"/>
    </StyledDiv>
  )
}

export default RegisterForm