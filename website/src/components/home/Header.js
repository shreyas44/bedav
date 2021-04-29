import Heading from "./Heading";
import React from "react";
import Summary from "./Summary";
import styled from "styled-components";

const HeaderContainer = styled.div`
  margin-bottom: 40px;
`;

function Header(props) {
  return (
    <HeaderContainer>
      <Heading country={props.country} />
      <Summary availability={props.country.availability} />
    </HeaderContainer>
  );
}

export default Header;
