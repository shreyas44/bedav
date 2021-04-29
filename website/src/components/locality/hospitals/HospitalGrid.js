import AbbreviationsInfo from "./AbbreviationsInfo";
import { DataToShowProvider } from "../../contexts/DataToShow";
import { GridContainer } from "../../grid";
import HospitalDataDropdown from "./HospitalDataDropdown";
import HospitalGridHeader from "./HospitalGridHeader";
import HospitalList from "./HospitalList";
import React from "react";
import styled from "styled-components";

const OptionsContainer = styled.div`
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
  width: 100%;
`;

const SectionContainer = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  max-width: 1400px;
  margin: 30px 0;
`;

function HospitalGrid(props) {
  return (
    <SectionContainer>
      <OptionsContainer>
        <AbbreviationsInfo />
        <HospitalDataDropdown />
      </OptionsContainer>
      <GridContainer
        columnTemplate="minmax(250px, 300px) minmax(150px, 225px) repeat(5, auto)"
        mobileColumnTemplate="minmax(150px, 175px) repeat(6, auto)"
      >
        <HospitalGridHeader
          geolocation={props.geolocation}
          setGetData={props.setGetData}
        />
        <HospitalList geolocation={props.geolocation} getData={props.getData} />
      </GridContainer>
    </SectionContainer>
  );
}

export default HospitalGrid;
