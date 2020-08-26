import React, {useState} from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  display: inline-block;
`

const StyledTip = styled.div`
  visibility: ${({visible}) => visible ? "visible" : "hidden"};
  position: absolute;
  z-index: 1000;
  display: block;
  margin: 0;
  font-size: 14px;
  word-wrap: break-word;
  text-align: center;
  transform: ${({position}) => position == "top" ? "translate(calc(-50% + 14px), calc(-100% - 11px))" : position == "bottom" ? "translate(0, calc(100% + 12px))" : null};
  cursor: pointer;
  /* calc(-100%-12px) as the square is 10px tall plus 2px for spacing
    -50% + 14px so that the padding is included
   */
`

const StyledWrapper = styled.div`
  max-width: 175px;
  width: max-content;
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 7px;
`

const Square = styled.div`
  position: absolute;
  ${({position}) => position == "top" ? "bottom" : position == "bottom" ? "top": null}: -5px;
  transform: translateX(50%);
  width: 100%;
  bottom: 5px;
  left: 0;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    background: black;
    position: absolute;
    left: -5px;
    transform: rotate(45deg);
  }
`

function Tooltip(props) {
  const [visible, setVisible] = useState(false) 

  const toggleTip = () => setVisible(!visible)

  return (
    <StyledContainer
      onMouseEnter={!props.onClick ? toggleTip : null}
      onMouseLeave={!props.onClick ? toggleTip : null}
      onClick={props.onClick ? toggleTip: null}
      ref={props.innerRef || null} 
    >
      <StyledTip role="tooltip" visible={visible} position={props.position || "top"}>
        <StyledWrapper>
          <Square position={props.position || "top"}/>
          {props.text}
        </StyledWrapper>
      </StyledTip>
      {props.children}
    </StyledContainer>
  )  
}

export default Tooltip
