import React from 'react'
import styled from 'styled-components'

export const StyledRow = styled.div`
  align-items: center;
  justify-content: space-between;
  color: #555;
  display: contents;
`

export const StyledItem = styled.div`
  padding: 0 20px;
  height: 100%;
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
`

export const StyledName = styled(StyledItem)`
  width: 200px;
  font-weight: bold;
  background: #f8f8f8;
  color: #0275b3;
`

export const StyledNumber = styled(StyledItem)`
  flex-grow: 1;
  text-align: right;
  background: ${({counter}) => counter % 2 == 0 ? "#f8f8f8" : "white"};
  color: ${({index}) => index % 2 != 0 ? "#C3423F" : "#08A045"};
`

function HospitalItem(props) {
  let {name, counter, ...items} = props

  items = Object.values(items)
  items = items.map((item, index) => <StyledNumber key={index} index={index} counter={counter}>{item}</StyledNumber>)
  return (
    <StyledRow counter={props.counter}>
      <StyledName counter={props.counter}>{props.name}</StyledName>
      {items}
    </StyledRow>
  )
}

export default HospitalItem