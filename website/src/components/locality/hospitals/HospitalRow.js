import { GridCell, GridColumnHeader } from "../../grid";
import React, { useContext, useRef } from "react";
import { addCommas, getDistance } from "../../extra/funcs";
import {
  useCategories,
  useColumns,
  useMobileCategories,
  useWindowSize,
} from "../../hooks";

import DataToShowContext from "../../contexts/DataToShow";
import HospitalsContext from "../../contexts/Hospitals";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Link } from "react-router-dom";
import Tooltip from "../../Tooltip";
import styled from "styled-components";

export const StyledRow = styled.div`
  display: contents;
`;

export const StyledNumber = styled(GridCell)`
  text-align: center;
  justify-content: center;
`;

const StyledInfoIcon = styled(InfoOutlinedIcon)`
  font-size: 19px !important;
  color: #aaa;
  padding-left: 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited {
    color: inherit;
  }
`;

function HospitalName({ name, counter, id }) {
  const linkRef = useRef();
  const parentRef = useRef();
  const tooltipRef = useRef();

  function handleClick(event) {
    if (document.documentElement.clientWidth <= 600) {
      if (tooltipRef.current.contains(event.target)) {
        parentRef.current.style.overflow = ["hidden", ""].includes(
          parentRef.current.style.overflow
        )
          ? "initial"
          : "hidden";
        return;
      }
    }

    linkRef.current.click();
  }

  function handleLinkClick(event) {
    event.stopPropagation();
  }

  let newName = name;

  if (document.documentElement.clientWidth <= 600) {
    if (name.length > 25) {
      newName = `${name.slice(0, 26).trim()}...`;
    }

    return (
      <GridColumnHeader counter={counter} onClick={handleClick} ref={parentRef}>
        <StyledLink
          to={`/hospital/${decodeURI(id)}`}
          onClick={handleLinkClick}
          ref={linkRef}
        >
          {newName}
        </StyledLink>
        {newName != name ? (
          <Tooltip text={name} innerRef={tooltipRef} onClick={true}>
            <StyledInfoIcon />
          </Tooltip>
        ) : null}
      </GridColumnHeader>
    );
  } else {
    return (
      <GridColumnHeader counter={counter} onClick={handleClick} ref={parentRef}>
        <StyledLink
          to={`/hospital/${encodeURIComponent(id)}`}
          onClick={handleLinkClick}
          ref={linkRef}
        >
          {name}
        </StyledLink>
      </GridColumnHeader>
    );
  }
}

function NumberCell(props) {
  return (
    <StyledNumber {...props}>
      {props.children == "N.A." ? "N.A." : addCommas(props.children)}
    </StyledNumber>
  );
}

function HospitalRow(props) {
  let { counter, hospital } = props;
  const { dataToShow } = useContext(DataToShowContext);
  const [width, _] = useWindowSize();
  const categories = useCategories();
  const mobileCategories = useMobileCategories();
  const columns = useColumns();

  const colorTheme =
    dataToShow == "available"
      ? "green"
      : dataToShow == "total"
      ? "blue"
      : dataToShow == "occupied"
      ? "red"
      : null;
  const renderedFields = columns.map((item, index) => (
    <NumberCell colorTheme={colorTheme} key={index} counter={counter}>
      {hospital[item].total ? hospital[item][dataToShow] : "N.A."}
    </NumberCell>
  ));

  return (
    <StyledRow counter={counter}>
      <HospitalName name={hospital.name} counter={counter} id={hospital.id} />

      <StyledNumber style={{ color: "#004266" }} counter={counter}>
        {hospital.category !== "" && hospital.category !== null
          ? width <= 600
            ? mobileCategories[categories[hospital.category]]
            : categories[hospital.category]
          : "N.A."}
      </StyledNumber>

      <StyledNumber style={{ color: "#004266" }} counter={counter}>
        {props.geolocation ? `${hospital.distance} km` : "N.A."}
      </StyledNumber>

      {renderedFields}
    </StyledRow>
  );
}

export default HospitalRow;
