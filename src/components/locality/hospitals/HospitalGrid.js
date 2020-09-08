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
  box-sizing: border-box;
  max-width: 1400px;
  margin: 30px 0;
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
          <HospitalGridHeader geolocation={props.geolocation} setGetData={props.setGetData}/>
          <HospitalList geolocation={props.geolocation} getData={props.getData}/>
        </GridContainer>
      </SectionContainer>
    </DataToShowProvider>
  )
}

export default HospitalGrid

