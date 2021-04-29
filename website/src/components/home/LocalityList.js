import React, { useRef } from "react";

import LocalityRow from "./LocalityRow";

function LocalityList(props) {
  const { locations } = props;
  const counter = useRef(-1);
  const items = locations.map((location) => {
    counter.current += 1;
    return (
      <LocalityRow
        key={`${location.node.name}-${location.node.state.id}`}
        location={location.node}
        counter={counter.current}
      />
    );
  });

  return <>{items}</>;
}

export default LocalityList;
