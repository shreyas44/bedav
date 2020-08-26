import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  color: ${({color}) => color};
`

const CardTitle = styled.div`
  font-weight: normal;
  font-size: 16px;
`

const CardText = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: right;
  position: absolute;
  bottom: 15px;
  right: 15px;
  font-family: "Quicksand";

  @media only screen and (max-width: 600px) {
    font-size: 23px;
    bottom: 7px;
    right: 7px;
  }
`

function capitalizeString(string) {
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  let new_string = string.split(' ')
  new_string = new_string.map(item => capitalizeFirstLetter(item))
  new_string = new_string.reduce((word, nstring) => `${nstring} ${word}`)
  new_string = new_string.trim()

  return new_string
}

function AmountCard(props) {
  let {name} = props
  name = capitalizeString(name)
  let color

  switch(name) {
    case 'Total':
      color = "#004266"
      break

    case 'Available':
      color = "#008033"
      break

    case 'Occupied':
      color = "#C3423F"
      break
  }

  return (
    <Container color={color}>
      <CardTitle>
        {capitalizeString(props.name)}
      </CardTitle>
      <CardText>
        {props.children}
      </CardText>
    </Container>
  )
}

export default AmountCard
