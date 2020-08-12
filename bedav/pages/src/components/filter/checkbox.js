import React from 'react'
import styled from 'styled-components'
import CheckIcon from '@material-ui/icons/Check';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const StyledDiv = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: ${({checked}) => checked ? "none" : "1px solid #ccc" };
  box-sizing: border-box;
  background: ${({checked}) => checked ? "#0B6E4F" : "white"};
  display: inline-block;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CheckedIcon = ({className}) => <FontAwesomeIcon icon={faCheck} className={className}/>

const StyledIcon = styled(CheckedIcon)`
  font-size: 14px;
  color: white;
`

function Checkbox(props) {
  const {checked, onClick} = props

  return <StyledDiv checked={checked} onClick={onClick}> {checked ? <StyledIcon /> : null} </StyledDiv>
}

export default Checkbox