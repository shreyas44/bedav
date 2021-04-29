import {
  Hospital,
  HospitalType,
  Location,
  StateAbbreviation,
} from ".prisma/client";

import { Client } from "@googlemaps/google-maps-services-js";

export interface Availability {
  available: number;
  occupied?: number;
  total?: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Options {
  useAddressForSearch?: boolean;
  getPhone?: boolean;
  onlyHasAvailable?: boolean;
}

export interface HospitalData {
  name: string;
  general?: Availability;
  icu?: Availability;
  hdu?: Availability;
  oxygen?: Availability;
  ventilator?: Availability;

  category?: HospitalType;
  phone?: string;
  address?: string;
  website?: string;
  email?: string;
  placeId?: string;

  object?: Hospital;
}

export interface GetDetailsArgs {
  maps: Client;
  hospital: HospitalData;
  location: LocationData;
}

export interface GetDetailsReturnType {
  formattedAddress?: string;
  phone?: string;
  website?: string;
  placeId?: string;
  coordinates?: Coordinates;
}

export interface LocationData<T extends string = string> {
  name: T;
  state: StateAbbreviation;
  hospitals: HospitalData[];
  coordinates?: Coordinates;
  radius?: number;
  options?: Options;
  object?: Location;
}
