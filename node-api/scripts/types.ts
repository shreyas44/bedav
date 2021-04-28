import { Hospital, Location, StateAbbreviation } from ".prisma/client";

export interface Availability {
  available: number;
  occupied?: number;
  total?: number;
}

export interface HospitalData {
  name: string;
  general?: Availability;
  icu?: Availability;
  hdu?: Availability;
  oxygen?: Availability;
  ventilator?: Availability;

  category?: string;
  phone?: string;
  address?: string;
  website?: string;
  email?: string;
  coordiantes?: {
    latitude: number;
    longitutde: number;
  };
  placeId?: string;

  object?: Hospital;
}

interface Options {
  hasAddress?: boolean;
  getAddress?: boolean;
  useAddressForAddress?: boolean;
  hasPhone?: boolean;
  getPhone?: boolean;
  onlyHasAvailable?: boolean;
}

export interface LocationData<T extends string = string> {
  name: T;
  state: StateAbbreviation;
  hospitals: HospitalData[];
  options?: Options;
  object?: Location;
}
