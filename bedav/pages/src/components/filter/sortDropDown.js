import React, { useState, useRef } from 'react'
import styled from 'styled-components'

export const FormFieldContainer = styled.div`
  width: 100%;
  position: relative;
  font-weight: 100;
  margin-bottom: 50px;
`

const StyledPlaceHolder = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.05s;
  font-size: 17px;

  ${
    props => props.value.length > 0 ?
    "color: green; font-size: 10px; transform: translate(0, 0);" :
    "color: grey; font-size: 17px; transform: translate(5px, 15px);"
  }
`

function FormField(props) {
  const [value, setValue] = useState('')
  const fieldRef = useRef(null)

  return (
    <FormFieldContainer>
      <StyledPlaceHolder onClick={() => fieldRef.current.focus()} value={value}>
        {props.fieldLabel}
        {
          props.required && value.length > 0?
          <span style={{color: "#FF5555"}}>*</span> :
          null
        }
      </StyledPlaceHolder>
      
    </FormFieldContainer>
  )
}

export default FormField