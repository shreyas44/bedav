import React from 'react'
import styled from 'styled-components'
import FormField from'./formField'

function SearchFormField(props) {
  const {fieldLabel, type} = props

  return <FormField {...props} />
}

export default SearchFormField