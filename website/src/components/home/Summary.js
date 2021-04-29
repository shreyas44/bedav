import AmountCard from "../hospital/AmountCard";
import React from "react";
import { addCommas } from "../extra/funcs";
import styled from "styled-components";

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  margin: 20px auto 0;
  position: relative;
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
