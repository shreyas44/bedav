import { gql } from "@apollo/client";

export const HospitalInfo = gql`
  fragment HospitalInfoFragment on Hospital {
    id
    name
    latitude
    longitude
    placeId

    icu {
      available
      occupied
      total
    }

    hdu {
      available
      occupied
      total
    }

    ventilator {
      available
      occupied
      total
    }

    general {
      available
      occupied
      total
    }

    oxygen {
      available
      occupied
      total
    }

    # category
    address
    phone
    website

    location {
      id
      name
      state {
        id
        name
      }
    }
  }
`;

export default HospitalInfo;
