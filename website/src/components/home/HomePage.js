import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import CountryFragment from "../fragments/country";
import { GridContainer } from "../grid";
import Header from "./Header";
import LocalityHeader from "./LocalityHeader";
import LocalityList from "./LocalityList";
import LocationInfoFragment from "../fragments/locality";
import Spinner from "../Spinner";
import Summary from "./Summary";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 100px auto 0;
`;

function HomePage(props) {
  useEffect(() => {
    document.title = "Bedav - Home";
  });

  const { data, loading, error } = useQuery(
    gql`
      query HomePageQuery {
        country {
          ...CountryFragment
          locations(first: 1000) {
            edges {
              node {
                ...LocationInfoFragment
              }
            }
          }
        }
      }
      ${CountryFragment}
      ${LocationInfoFragment}
    `,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  if (error && !data) {
    return null;
  }

  if (!data) return <Spinner />;

  return (
    <StyledContainer>
      <Header country={data.country} />
      <GridContainer
        columnTemplate="repeat(4, auto)"
        mobileColumnTemplate="repeat(4, auto)"
      >
        <LocalityHeader />
        <LocalityList locations={data.country.locations.edges} />
      </GridContainer>
    </StyledContainer>
  );
}

export default HomePage;
