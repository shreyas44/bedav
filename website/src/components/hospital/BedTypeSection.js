import AmountCard from "./AmountCard";
import React from "react";
import styled from "styled-components";

const BedTypeSectionContainer = styled.div`
  margin-bottom: 30px;

  @media only screen and (max-width: 600px) {
    margin-bottom: 25px;
  }
`;

const BedTypeSectionHeader = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const BedTypeCardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0;

  & > div {
    width: 33%;
    margin: 0 10px;
    padding: 15px;
    box-sizing: border-box;
    height: 100px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
    position: relative;
    border-radius: 5px;

    &:first-child {
      margin-left: 0;
    }

    &::last-child {
      margin-right: 0;
    }
  }

  @media only screen and (max-width: 600px) {
    margin: 5px 0 0;

    & > div {
      margin: 0 5px;
      padding: 10px;
      height: 80px;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
`;

function BedTypeSection(props) {
  let { sectionName, values } = props;
  values = { ...values };

  if (values["__typename"]) delete values["__typename"];
  const cards = Object.keys(values).map((name, index) => (
    <AmountCard key={index} name={name}>
      {values[name]}
    </AmountCard>
  ));

  return (
    <BedTypeSectionContainer>
      <BedTypeSectionHeader>{sectionName}</BedTypeSectionHeader>
      <BedTypeCardsContainer>{cards}</BedTypeCardsContainer>
    </BedTypeSectionContainer>
  );
}

export default BedTypeSection;
