import { gql } from "@apollo/client";

const CountryFragment = gql`
  fragment CountryFragment on Country {
    availability {
      total
      occupied
      available
    }
    lastUpdated
  }
`;

export default CountryFragment;
