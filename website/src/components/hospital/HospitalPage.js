import React, { useEffect, useState } from "react";
import { gql, useApolloClient, useLazyQuery } from "@apollo/client";

import BedInfoSection from "./BedInfoSection";
import HospitalInfoFragment from "../fragments/hospital";
import HospitalInfoSection from "./HospitalInfoSection";
import Spinner from "../Spinner";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const MainContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  max-width: 1500px;
  margin: 100px auto 0;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div {
    width: 50%;
    padding: 0 5px;
    box-sizing: border-box;
    margin: 0 20px;
  }

  @media only screen and (max-width: 600px) {
    & {
      flex-direction: column;
      padding: 0;
      margin-top: 80px;
    }

    & > div {
      width: 100%;
      margin: 10px 0;
    }
  }
`;

const PageQuery = gql`
  query HospitalPageQuery($hospitalId: ID!) {
    hospital(id: $hospitalId) {
      ...HospitalInfoFragment
    }
  }
  ${HospitalInfoFragment}
`;

function HospitalPage(props) {
  let { hospitalId } = useParams();
  const client = useApolloClient();
  hospitalId = decodeURIComponent(hospitalId);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  let cachedHospital = client.readFragment({
    id: `Hospital:${hospitalId}`,
    fragment: HospitalInfoFragment,
  });

  const [hospital, setHospital] = useState(cachedHospital);
  const [getHospital, { data, loading }] = useLazyQuery(PageQuery, {
    variables: {
      hospitalId: hospitalId,
    },
  });

  if (data && data.hospital && !hospital) {
    setHospital(data.hospital);
  }

  if (hospital) {
    document.title = "Bedav - " + hospital.name;
  } else if (loading) {
    return <Spinner />;
  } else if (hospital === null) {
    getHospital({
      variables: {
        hospitalId,
      },
    });

    return <Spinner />;
  }

  return (
    <>
      <MainContainer>
        <BedInfoSection hospital={hospital} />
        <HospitalInfoSection hospital={hospital} />
      </MainContainer>
    </>
  );
}

export default HospitalPage;
