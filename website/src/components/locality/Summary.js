import AmountCard from "../hospital/AmountCard";
import React from "react";
import styled from "styled-components";

const SummaryContainer = styled.div`
  display: flex;
  margin: 15px 0;
  justify-content: space-between;
`;

function Summary({ availability }) {
  return (
    <SummaryContainer>
      <AmountCard name="Available">{availability.available}</AmountCard>
      <AmountCard name="Occupied">{availability.occupied}</AmountCard>
      <AmountCard name="Total">{availability.total}</AmountCard>
    </SummaryContainer>
  );
}

export default Summary;
