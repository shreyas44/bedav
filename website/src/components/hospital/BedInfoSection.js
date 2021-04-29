import BedTypeSection from "./BedTypeSection";
import HospitalHeading from "./HospitalHeading";
import React from "react";
import data from "../extra/data";
import styled from "styled-components";

const BedInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  order: 1;

  @media only screen and (max-width: 600px) {
    order: 2;
  }
`;

const StyledHospitalHeading = styled(HospitalHeading)`
  display: none;

  @media only screen and (min-width: 600px) {
    display: block;
  }
`;

function BedInfo(props) {
  const { hospital } = props;
  const key = `${hospital.location.name.toLowerCase()}-${hospital.location.state.id.toLowerCase()}`;
  const columns = data.columns[key];
  const values = {
    "General Ward": {
      available: "N.A.",
      occupied: "N.A.",
      total: "N.A.",
    },
    "Beds with Oxygen (O2)": {
      available: "N.A.",
      occupied: "N.A.",
      total: "N.A.",
    },
    "High Dependency Unit": {
      available: "N.A.",
      occupied: "N.A.",
      total: "N.A.",
    },
    "Intensive Care Unit": {
      available: "N.A.",
      occupied: "N.A.",
      total: "N.A.",
    },
    Ventilators: {
      available: "N.A.",
      occupied: "N.A.",
      total: "N.A.",
    },
  };

  // check for columns

  if (!columns.includes("general")) {
    delete values["General Ward"];
  }

  if (!columns.includes("oxygen")) {
    delete values["Beds with Oxygen (O2)"];
  }

  if (!columns.includes("icu")) {
    delete values["Intensive Care Unit"];
  }

  if (!columns.includes("hdu")) {
    delete values["High Dependency Unit"];
  }

  if (!columns.includes("ventilator")) {
    delete values["Ventilators"];
  }

  // check if null

  if (hospital.general?.total) values["General Ward"] = hospital.general;
  if (hospital.oxygen?.total) values["Beds with Oxygen (O2)"] = hospital.oxygen;
  if (hospital.hdu?.total) values["High Dependency Unit"] = hospital.hdu;
  if (hospital.icu?.total) values["Intensive Care Unit"] = hospital.icu;
  if (hospital.ventilators?.total) values["Ventilators"] = hospital.ventilator;

  const sections = Object.keys(values).map((value, index) => (
    <BedTypeSection key={index} sectionName={value} values={values[value]} />
  ));

  return (
    <BedInfoContainer>
      <StyledHospitalHeading hospital={hospital} />
      {sections}
    </BedInfoContainer>
  );
}

export default BedInfo;
