import React from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'

const SpinnerContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Spinner() {
  return (
    <SpinnerContainer>
      <Loader 
        visible
        type="TailSpin"
        color="var(--east-bay)"
        height={50}
        width={50}
      />
    </SpinnerContainer>
  )
}

export default Spinner
