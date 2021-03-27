import React from 'react'
import styled from 'styled-components'
import { addCommas } from '../extra/funcs'

const CardContainer = styled.div`
  color: ${({color}) => color};
  width: 33%;
  margin: 0 10px;
  padding: 15px;
  box-sizing: border-box;
  height: 100px;
  box-shadow: 2px 4px 8px rgba(0,0,0,0.3);
  position: relative;
  border-radius: 5px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  @media only screen and (max-width: 600px) {
    margin: 0 5px;
    padding: 10px;
    height: 80px;
    box-shadow: 1px 2px 4px rgba(0,0,0,0.2);
  }
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
      color = "var(--regal-blue)"
      break

    case 'Available':
      color = "var(--fun-green)"
      break

    case 'Occupied':
      color = "var(--mojo)"
      break
  }

  return (
    <CardContainer color={color}>
      <CardTitle>
        {capitalizeString(props.name)}
      </CardTitle>
      <CardText>
        {addCommas(props.children)}
      </CardText>
    </CardContainer>
  )
}

export default AmountCard
