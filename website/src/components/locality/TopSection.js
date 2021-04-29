import React, { useContext } from "react";

import CityHeading from "./CityHeading";
import SearchBar from "./SearchBar";
import SearchContext from "../contexts/SearchHospital";
import Summary from "./Summary";
import ViewAllButton from "./ViewAllButton";
import styled from "styled-components";
import { useWindowSize } from "../hooks";

const TopContainer = styled.div`
  margin: 100px auto 0;
  width: 60%;

  @media only screen and (max-width: 600px) {
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
  }
`;

const CityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;

  ${({ focused }) => (focused ? "margin-top: -20px" : null)}
`;

const InfoContainer = styled.div`
  width: 70%;
  margin: 30px auto 0px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

function TopSection({ location }) {
  const { focused } = useContext(SearchContext);
  const [width, _] = useWindowSize();

  return (
    <TopContainer>
      <SearchBar />
      <InfoContainer>
        <CityContainer focused={focused && width <= 600 ? 1 : 0}>
          <CityHeading lastUpdated={location.lastUpdated}>
            {location.name}
          </CityHeading>
          <ViewAllButton />
        </CityContainer>
        {width <= 600 ? (
          !focused ? (
            <Summary availability={location.availability} />
          ) : null
        ) : (
          <Summary availability={location.availability} />
        )}
      </InfoContainer>
    </TopContainer>
  );
}

export default TopSection;
