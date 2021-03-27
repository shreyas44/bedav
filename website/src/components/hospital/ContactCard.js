import React, { useRef } from 'react'
import styled from 'styled-components'

const ContactContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: all 0.1s;
  position: relative;
  background-color: white;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 2px 4px rgba(0,0,0,0.4)
  }
`

const StyledText = styled.div`
  margin: auto;
  text-align: center;
  width: calc(100% - 46px);
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  color: var(--deep-cerulean);
  text-decoration: none;

  & a, & a:visited {
    color: inherit;
    text-decoration: inherit;
  }

`

function ContactCard(props) {
  const ref = useRef()

  const StyledIcon = styled(props.icon)`
    font-size: 26px !important;
    position: absolute;
    left: 10px;
  `
  function handleClick() {
    ref.current.click()
  }

  return (
    <ContactContainer onClick={() => ref.current.click()}>
      <StyledIcon />
      <StyledText>
        {React.cloneElement(props.children, {ref: ref})}
      </StyledText>
    </ContactContainer>
  )
}

export default ContactCard
