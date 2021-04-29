import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { DataToShowProvider } from "../contexts/DataToShow";
import FilterSection from "./filter";
import HospitalGrid from "./hospitals/HospitalGrid";
import HospitalInfoFragment from "../fragments/hospital";
import { HospitalsProvider } from "../contexts/Hospitals";
import { LocalityProvider } from "../contexts/Locality";
import LocationInfoFragment from "../fragments/locality";
import { SearchHospitalProvider } from "../contexts/SearchHospital";
import { SelectedFiltersProvider } from "../contexts/SelectedFilters";
import { SortProvider } from "../contexts/Sort";
import Spinner from "../Spinner";
import Swal from "sweetalert2";
import TopSection from "./TopSection";
import { useDictState } from "../hooks";

const NotFoundPage = lazy(() => import("../NotFoundPage"));

const query = gql`
  query LocalityPageQuery(
    $locationName: String!
    $locationState: StateAbbreviation!
  ) {
    location(name: $locationName, state: $locationState) {
      name
      ...LocationInfoFragment
      hospitals(first: 2000) {
        edges {
          node {
            ...HospitalInfoFragment
          }
        }
      }
    }
  }

  ${LocationInfoFragment}
  ${HospitalInfoFragment}
`;

function LocalityPage(props) {
  const localityRef = useRef(
    props.match ? props.match.params.localityName : null
  );
  let localityName = localityRef.current;
  const [updates, setUpdates] = useState(0);

  const [state, setState] = useDictState({
    geolocation: false,
    getData: false,
  });

  const { data, loading, error } = useQuery(query, {
    variables: {
      locationName: localityRef.current.split("-")[0],
      locationState: localityRef.current.split("-")[1]?.toUpperCase(),
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    props.ensureDidMount();
  }, []);

  useEffect(() => {
    const currentName = props.match ? props.match.params.localityName : null;

    if (
      currentName &&
      currentName != localityRef.current &&
      /^\/(?!about).*\/$/.test(window.location.pathname)
    ) {
      localityRef.current = currentName;
      setUpdates(updates + 1);
    }
  });

  function setCoords(position) {
    setState({
      geolocation: true,
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      getData: true,
    });
  }

  function setPosition() {
    navigator.geolocation.getCurrentPosition(setCoords, () => {
      setState({ geolocation: false, getData: true });
    });
  }

  function requestAndSetPosition() {
    Swal.fire({
      title: "Find hospitals closest to you",
      html:
        "If you want to find the hospitals which are closest to you, please allow <b>bedav</b> to access your location.",
      icon: null,
      showCancelButton: true,
      cancelButtonText: "Not now",
      confirmButtonText: "Always Allow",
      padding: "3em 1em",
      width: "33em",
      confirmButtonColor: "#28a745",
    }).then((result) => {
      if (result.isConfirmed === true) {
        setPosition();
      } else if (result.isConfirmed === false) {
        setState({
          getData: true,
        });
      }
    });
  }

  function handleGeolocationState(result) {
    switch (result.state) {
      case "granted":
        setPosition();
        break;
      case "prompt":
        requestAndSetPosition();
        break;
      case "denied":
        setState({
          getData: true,
        });
    }
  }

  function requestGeolocationRequest() {
    if (navigator.permissions !== undefined) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        handleGeolocationState(result);
        result.onchange = handleGeolocationState(result);
      });
    } else {
      requestAndSetPosition();
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      requestGeolocationRequest();
    } else {
      setState({ getData: true });
    }
  }, []);

  if (
    !/^\/(?!about).*\/?$/.test(window.location.pathname) ||
    window.location.pathname == "/"
  ) {
    return null;
  }

  if (error) {
    if (data === undefined) {
      return (
        <Suspense fallback="">
          <NotFoundPage offline />
        </Suspense>
      );
    } else if (data.location === null) {
      return (
        <Suspense fallback="">
          <NotFoundPage />
        </Suspense>
      );
    }
  }

  if (!state.getData || !data || (!data && loading)) return <Spinner />;

  if (data.location) {
    document.title = "Bedav - " + data.location.name;

    return (
      <div>
        <SelectedFiltersProvider>
          <LocalityProvider initial={localityName}>
            <SearchHospitalProvider>
              <SortProvider
                initial={{
                  field: state.geolocation ? "distance" : "general",
                  descending: state.geolocation ? false : true,
                }}
              >
                <TopSection location={data.location} />
                <DataToShowProvider>
                  <HospitalsProvider
                    hospitals={data.location.hospitals.edges}
                    latitude={state.lat}
                    longitude={state.lon}
                    geolocation={state.geolocation}
                  >
                    <HospitalGrid
                      getData={state.getData}
                      geolocation={state.geolocation}
                    />
                  </HospitalsProvider>
                </DataToShowProvider>
              </SortProvider>
            </SearchHospitalProvider>
            <FilterSection />
          </LocalityProvider>
        </SelectedFiltersProvider>
      </div>
    );
  }

  return null;
}

export default LocalityPage;
