import { gql } from "@apollo/client";

const LocationInfoFragment = gql`
  fragment LocationInfoFragment on Location {
    name
    lastUpdated

    availability {
      total
      occupied
      available
    }

    state {
      id
      name
    }
  }
`;
export default LocationInfoFragment;
