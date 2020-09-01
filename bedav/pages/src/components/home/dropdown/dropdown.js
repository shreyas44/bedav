import React from 'react'
import styled from 'styled-components'
import DropdownItem from './DropdownItem'
import { useDictState } from '../../hooks'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const StyledContainer = styled.div`
  position: relative;
`

const StyledSelected = styled.div`
  font-size: 16px;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 5px;
  color: #666;
  cursor: pointer;

  &:hover {
    color: black;
  }
`

const StyledDropdownContainer = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  z-index: 1000;
  background-color: white;
  display: ${({visible}) => visible ? "block" : "none"};
  position: absolute;
  right: 0;
  width: 100%;

  @media only screen and (max-width: 600px) {
    box-shadow: 0 0 8px rgba(0,0,0,0.4);
    border-radius: 10px;
    top: 30px;
  }
`

const StyledIcon = styled(ArrowDropDownIcon)`
  transition: all 0.1s;
  transform: rotate(${({visible}) => visible ? 180 : 0})deg;
  cursor: pointer;
  margin-left: 2px;
`

function Dropdown(props) {
  const {items, initialItem} = props
  const [state, setState] = useDictState({
    currentValue: initialItem,
    visible: false
  })
  
  function handleClick(event) {
    const newValue = event.target.getAttribute("value")
    
    setState({currentValue: newValue, visible: false})
    props.handleClick(newValue)
  }

  const rendered = Object.keys(items).map((value, index) => <DropdownItem value={value} key={index} onClick={handleClick}>{items[value]}</DropdownItem>)

  return (
    <StyledContainer className={props.className || null}>
      <StyledSelected onClick={() => setState({visible: !state.visible})}>
        <span>
          {items[state.currentValue]} 
        </span>
        <StyledIcon visible={state.visible ? 1 : undefined} />
      </StyledSelected>
      <StyledDropdownContainer onClick={handleClick} visible={state.visible}>
        {rendered}
      </StyledDropdownContainer>
    </StyledContainer>
  )
}

export default Dropdown