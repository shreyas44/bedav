import React from 'react'
import styled from 'styled-components'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

const StyledIcon = styled(ErrorOutlineIcon)`
  font-size: 100px !important;
  margin: auto;
  color: #ffcc00;
`

const NotFoundText = styled.div`
  font-family: "Quicksand", sans-serif;
  font-size: 30px;

  & > span {
    font-size: 21px;
    display: block;
  }
`

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`

const NotFoundContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  top: 0;
  width: 100%;
  color: #cfa500;
  margin-left: -10px;
`

function NotFoundPage(props) {
  const offline = props.offline === undefined ? false : props.offline
  return (
    <NotFoundContainer>
      <NotFoundWrapper>
        <StyledIcon />
        <NotFoundText>
          {!offline ? 
            <>
              404 Page Not Found!
              <span>Make sure the URL you entered is correct.</span>
            </> :
            <>
              Looks like you are offline!
              <span>Check your internet connection and try again.</span>
            </> 
          }
        </NotFoundText>
      </NotFoundWrapper>
    </NotFoundContainer>
  )
}

export default NotFoundPage
