import React from 'react'
import styled from 'styled-components'
import categories from '../extra/categories'

const HeadingContainer = styled.div`
  margin: 0 0 25px 0;
  color: #0275b3;
  font-family: "Quicksand", sans-seif;
`

const StyledHeading = styled.h1`
  margin: 0;
  font-size: 24px;
`

const StyledSubHeading = styled.h2`
  margin: 0px 0 0;
  font-size: 14px;
  font-weight: normal;
`

function HospitalHeading(props) {
  const {hospital} = props
  return (
    <HeadingContainer className={props.className}>
      <StyledHeading>{hospital.name}</StyledHeading>
      <StyledSubHeading>{categories[hospital.category]}</StyledSubHeading>
    </HeadingContainer>   
  )
}

export default HospitalHeading
