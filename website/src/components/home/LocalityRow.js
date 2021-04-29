import { GridCell, GridColumnHeader } from "../grid";
import React, { useRef } from "react";
import { addCommas, capitalize } from "../extra/funcs";

import { Link } from "react-router-dom";
import styled from "styled-components";

const Row = styled.div`
  display: contents;

  & > div {
    background-color: ${({ counter }) =>
      counter % 2 == 0 ? "white" : "#f8f8f8"};
  }
`;

const StyledCell = styled(GridCell)`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  text-transform: capitalize;

  &:visited {
    color: inherit;
  }
`;

function NumberCell(props) {
  return <StyledCell {...props}>{addCommas(props.children)}</StyledCell>;
}

function LocalityRow(props) {
  const { location } = props;
  const { availability } = location;
  const ref = useRef();

  return (
    <Row counter={props.counter}>
      <GridColumnHeader onClick={() => ref.current.click()}>
        <StyledLink
          ref={ref}
          onClick={(event) => event.stopPropagation()}
          to={`/${location.name.toLowerCase()}-${location.state.id.toLowerCase()}/`}
        >
          {location.name}, {location.state.name}
        </StyledLink>
      </GridColumnHeader>
      <NumberCell colorTheme="green">{availability.available}</NumberCell>
      <NumberCell colorTheme="red">{availability.occupied}</NumberCell>
      <NumberCell colorTheme="total">{availability.total}</NumberCell>
    </Row>
  );
}

export default LocalityRow;
