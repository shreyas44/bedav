import React from 'react'
import styled from 'styled-components'
import Middle from './middle'
import HospitalSection from './hospitals/hospitalSection'
import { SearchHospitalProvider } from '../contexts/SearchHospital'
import { SortProvider } from '../contexts/Sort'

const StyledDiv = styled.div`
  width: 100%;
  padding: 15px 35px;
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  left: 0;
  margin: 0;
  background: white;
  transition: opacity 0.2s;
  z-index: -2;
`

function Main(props) {
  return (
    <SearchHospitalProvider>
      <StyledDiv>
        <Middle />
        <SortProvider>
          <HospitalSection />
        </SortProvider>
      </StyledDiv>
    </SearchHospitalProvider>
  ) 
}

export default Main
