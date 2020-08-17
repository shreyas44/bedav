import React, { useState } from 'react'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DropdownMenu from './dropdownMenu'

const MainContainer = styled.div`
  position: relative;
  margin: 10px 0;
`

const StyledDiv = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background: ${({open}) => open ? "#f7f7f7" : "white"};
  /* transition: all 0.1s; */
`

const StyledSpan = styled.span`
  font-size: 17px;
  font-weight: 100;
  position: relative;
  top: 2px;
  padding: 10px;
`

const StyledIcon = styled(ExpandMoreIcon)`
  height: 1.4em !important;
  width: 1.4em !important;
  cursor: pointer !important;
  transform: ${({open}) => open ? "rotate(0)" : "rotate(-90deg)"};
  /* transition: transform 0.1; */
`

function Dropdown(props) {
  const {values, value, setValue} = props
  const [open, setOpen] = useState(false)

  let currentValues = {...values}
  delete currentValues[value]

  function handleClick(event) {
    console.log(event.target.getAttribute('value'))
    setValue(event.target.getAttribute('value'))
    setOpen(false)
  }

  return (
    <MainContainer>
      <StyledDiv open={open}>
        <StyledSpan>{values[value]}</StyledSpan>
        <StyledIcon  open={open} onClick={() => setOpen(!open)}/>
      </StyledDiv>
      <DropdownMenu
        values={currentValues}
        onClick={handleClick}
        open={open}
      />
    </MainContainer>
  )
}

export default Dropdown