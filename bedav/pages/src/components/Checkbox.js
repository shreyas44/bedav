import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const StyledDiv = styled.div`
  width: ${({size}) => size === "large" ? "25px" : size === "medium" ? "20px" : null};
  height: ${({size}) => size === "large" ? "25px" : size === "medium" ? "20px" : null};
  border-radius: 100%;
  border: ${({checked}) => checked ? "none" : "1px solid #ccc" };
  box-sizing: border-box;
  background: ${({checked}) => checked ? "#0B6E4F" : "white"};
  display: inline-block;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CheckedIcon = props => <FontAwesomeIcon icon={faCheck} {...props}/>

const StyledIcon = styled(CheckedIcon)`
  font-size: 14px;
  color: white;
  display: ${({checked}) => checked ? 'initial' : "none"};
`

const StyledCircle = styled.div`
  width: ${({size}) => size === "large" ? "11px" : size === "medium" ? "6px" : null};
  height: ${({size}) => size === "large" ? "11px" : size === "medium" ? "6px" : null};
  display: ${({checked}) => checked ? 'flex' : "none"};
  justify-content: center;
  align-content: center;
  border-radius: 100%;
  background-color: white;
`

function Checkbox(props) {
  let {checked, onClick, radio, size} = props

  if(radio === undefined) {
    radio = false
  } 

  if(size === undefined) {
    size = "large"
  }

  return (
    <StyledDiv checked={checked} onClick={onClick} size={size}>
      { radio ? 
        <StyledCircle checked={checked} size={size}/> :
        <StyledIcon checked={checked}/>
      }
    </StyledDiv>
  )
}

export default Checkbox
