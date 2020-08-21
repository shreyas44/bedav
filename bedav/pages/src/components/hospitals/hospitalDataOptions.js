import React from 'react'
import styled from 'styled-components'
import Checkbox from '../checkbox'

const StyledOptionsDiv = styled.div`
  margin: 5px 0;
  grid-column: 1 / -1;
  display: flex;
  position: absolute;
  right: 0;
  top: -10px;
`

const StyledP = styled.p`
  margin: 0 7px;
  font-size: 16px;
  font-weight: normal;
  color: #444;
  display: inline-block;
  display: flex;
  align-content: center;
  position: relative;
  top: 1px;
`

const StyledDiv = styled.div`
  display: flex;
  align-content: center;
  margin: 0 0 0 15px;
`

function HospitalDataOption(props) {
  const {checked, onClick, text} = props

  return (
    <StyledDiv>
      <Checkbox 
        checked={checked}
        onClick={onClick}
        radio={true}
        size="medium"
      />
      <StyledP>
        {text}
      </StyledP>
    </StyledDiv>
  )  
}

function HospitalDataOptions(props) {
  const {dataToShow, setDataToShow} = props

  function handleOccupiedClick(event) {
    if(dataToShow !== "occupied") {
      setDataToShow("occupied")
    }
  }

  function handleAvailableClick(event) {
    if(dataToShow !== "available") {
      setDataToShow("available")
    }
  }

  function handleTotalClick(event) {
    if(dataToShow !== "total") {
      setDataToShow("total")
    } 
  }

  return (
    <StyledOptionsDiv>
      <HospitalDataOption 
        checked={dataToShow === "available"}
        onClick={handleAvailableClick}
        text="Available"
      />

      <HospitalDataOption 
        checked={dataToShow === "occupied"}
        onClick={handleOccupiedClick}
        text="Occupied"
      />

      <HospitalDataOption 
        checked={dataToShow === "total"}
        onClick={handleTotalClick}
        text="Total"
      />

    </StyledOptionsDiv>
  )
}

export default HospitalDataOptions