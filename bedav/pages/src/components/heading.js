import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const HeadingContainer = styled.div`
  font-family: "Quicksand", sans-serif;
  float: left;
  margin: 0;
`

const StyledLink = styled(Link)`
  font-size: 33px;
  color: black;
  margin: 0;
  text-decoration: none;
  font-weight: bold;
`

const StyledDescription = styled.span`
  margin: -5px 0 0;
  font-size: 13px;
  display: block;
  font-weight: normal;
`

function Heading() {
  return (
    <HeadingContainer>
      <StyledLink to="/">
        bedav
        <StyledDescription>
          Find the hospital you need
        </StyledDescription>
      </StyledLink>
    </HeadingContainer>
  )
}

export default Heading