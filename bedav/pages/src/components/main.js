import React, {useContext} from 'react'
import styled from 'styled-components'
import Middle from './middle'
import HospitalSection from './hospitals/hospitalSection'
import FilterScreenContext from './contexts/FilterScreen'
import { SearchHospitalProvider } from './contexts/SearchHospital'

const StyledDiv = styled.div`
  width: 100%;
  padding: 15px 35px;
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  left: 0;
  margin: 0;
  background: white;
  opacity: ${({filterScreen}) => filterScreen ? 0 : 1};
  transition: opacity 0.2s;
  z-index: ${({filterScreen}) => filterScreen ? -1 : 1};
`

function Main(props) {
  const {filterScreen} = useContext(FilterScreenContext)

  return (
    <SearchHospitalProvider>
      <StyledDiv filterScreen={filterScreen}>
        <Middle />
        <HospitalSection />
      </StyledDiv>
    </SearchHospitalProvider>
  ) 
}

export default Main
