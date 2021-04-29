import { Client, PlaceInputType } from "@googlemaps/google-maps-services-js";
import {
  Coordinates,
  GetDetailsArgs,
  GetDetailsReturnType,
  HospitalData,
  LocationData,
} from "../scripts/types";

function getSearchQuery({
  hospital,
  location,
}: {
  hospital: HospitalData;
  location: LocationData;
}): string {
  let query = "";

  if (location.options?.useAddressForSearch) {
    query = `${hospital.name}, ${hospital.address ? hospital.address : ""}`;
    return query;
  } else {
    query = hospital.name;
  }

  return query;
}

function getLocationBias({ location }: { location: LocationData }) {
  const radius = location.radius || "100000";
  const { latitude, longitude } = location.coordinates!;

  return `circle:${radius}@${latitude},${longitude}`;
}

async function getPlaceId({
  maps,
  hospital,
  location,
}: GetDetailsArgs): Promise<string | null> {
  const { data: searchResults } = await maps.findPlaceFromText({
    params: {
      input: getSearchQuery({ location, hospital }),
      inputtype: PlaceInputType.textQuery,
      key: process.env.MAPS_API_KEY as string,
      locationbias: getLocationBias({ location }),
      fields: ["place_id"],
    },
  });

  const searchResult = searchResults.candidates[0];
  const placeId = searchResult?.place_id;

  return searchResult ? placeId ?? null : null;
}

export async function getPlaceDetails({
  maps,
  hospital,
  location,
}: GetDetailsArgs): Promise<GetDetailsReturnType | null> {
  console.log(`Getting details for ${hospital.name}, ${location.name}`);
  const placeId = await getPlaceId({ maps, hospital, location });
  if (!placeId) return null;

  const {
    data: { result: details },
  } = await maps.placeDetails({
    params: {
      place_id: placeId,
      key: process.env.MAPS_API_KEY as string,
      fields: [
        "name",
        "address_component",
        "adr_address",
        "formatted_address",
        "geometry",
        "name",
        "place_id",
        "plus_code",
        "type",
        "url",
        "international_phone_number",
        "website",
      ],
    },
  });

  const coordinates = details.geometry && {
    latitude: details.geometry.location.lat,
    longitude: details.geometry.location.lng,
  };

  return {
    coordinates,
    placeId,
    phone: details.international_phone_number,
    formattedAddress: details.formatted_address,
    website: details.website,
  };
}

export async function getLocationCoordinates({
  maps,
  name,
}: {
  maps: Client;
  name: string;
}): Promise<Coordinates> {
  const {
    data: { results },
  } = await maps.geocode({
    params: {
      key: process.env.MAPS_API_KEY as string,
      address: `${name}, India`,
    },
  });

  const { geometry } = results[0];

  return {
    latitude: geometry.location.lat,
    longitude: geometry.location.lng,
  };
}
