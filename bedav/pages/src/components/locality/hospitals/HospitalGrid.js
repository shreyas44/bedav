import React from 'react'
import styled from 'styled-components'
import { DataToShowProvider } from '../../contexts/DataToShow'
import HospitalGridHeader from './HospitalGridHeader'
import HospitalList from './HospitalList'
import AbbreviationsInfo from './AbbreviationsInfo'
import HospitalDataDropdown from './HospitalDataDropdown'
import { GridContainer } from '../../grid'

const OptionsContainer = styled.div`
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
  width: 100%;
`

const SectionContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 10vh auto;
  box-sizing: border-box;
  max-width: 1400px;
`

function HospitalGrid(props) {
  return (
    <DataToShowProvider>
      <SectionContainer>
        <OptionsContainer>
          <AbbreviationsInfo />
          <HospitalDataDropdown />
        </OptionsContainer>
        <GridContainer
          columnTemplate="minmax(250px, 300px) minmax(150px, 225px) repeat(5, auto)"
          mobileColumnTemplate="minmax(150px, 175px) repeat(6, auto)"
        >
          <HospitalGridHeader geolocation={props.geolocation}/>
          { 
            props.getData ? <HospitalList geolocation={props.geolocation} locality={props.locality} /> :
            <div>Loading...</div> 
          }
        </GridContainer>
      </SectionContainer>
    </DataToShowProvider>
  )
}

export default HospitalGrid
