import React from 'react'
import styled from 'styled-components'

const StyledHeading = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 25px;
  font-family: 'Quicksand';
`

const StyledDiv = styled.div`
  margin-top: 5px;
`

const StyledContainer = styled.div`
  margin: 30px 10px;
`

function FilterSection(props) {
  const {name} = props

  return (
    <StyledDiv>
      <StyledHeading>{name}</StyledHeading>
      <StyledContainer>
        {props.children}
      </StyledContainer>
    </StyledDiv>
  )
}

export default FilterSection