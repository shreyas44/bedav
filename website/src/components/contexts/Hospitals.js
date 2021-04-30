import React, { useContext } from "react";

import DataToShowContext from "./DataToShow";
import SearchHospitalContext from "./SearchHospital";
import SelectedFiltersContext from "./SelectedFilters";
import SortContext from "./Sort";
import { getDistance } from "../extra/funcs";

const HospitalsContext = React.createContext();

let HospitalsProvider = (props) => {
  const { sortValue } = useContext(SortContext);
  const { searchQuery } = useContext(SearchHospitalContext);
  const { dataToShow } = useContext(DataToShowContext);
  const { filters } = useContext(SelectedFiltersContext);
  let { hospitals } = props;

  hospitals = hospitals.map((hospital) => {
    const localHospital = { ...hospital.node };
    localHospital.distance = getDistance(
      localHospital.latitude,
      props.latitude,
      localHospital.longitude,
      props.longitude
    );

    return localHospital;
  });

  //searching and filtering
  hospitals = hospitals.filter((hospital) => {
    if (filters.length > 0) {
      return (
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        filters.includes(hospital.category)
      );
    }

    return hospital.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  //sorting
  hospitals.sort((hospital, nextHospital) => {
    const currentValue =
      (hospital[sortValue.field] && hospital[sortValue.field][dataToShow]) || 0;
    const nextValue =
      (nextHospital[sortValue.field] &&
        nextHospital[sortValue.field][dataToShow]) ||
      0;

    if (sortValue.descending) {
      return sortValue.field !== "distance"
        ? nextValue - currentValue
        : nextHospital.distance - hospital.distance;
    }

    return sortValue.field !== "distance"
      ? currentValue - nextValue
      : hospital.distance - nextHospital.distance;
  });

  return (
    <HospitalsContext.Provider value={hospitals}>
      {props.children}
    </HospitalsContext.Provider>
  );
};

export { HospitalsProvider };
export default HospitalsContext;
