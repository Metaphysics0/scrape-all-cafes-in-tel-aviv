import { GooglePlacesEndpoints } from './constants/google-places-endpoints.enum';
import googleMapsData from '../../data/google-maps/1727511082307.json';

export async function getPlaceDetails({
  placeId,
}: {
  placeId: string;
}): Promise<any> {
  try {
    const response = await fetch(
      GooglePlacesEndpoints.GET_PLACE_DETAILS +
        `?place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    return response.json();
  } catch (error) {
    console.error('Error getting place details', error);
    return [];
  }
}

const placeDetails = await getPlaceDetails({
  placeId: googleMapsData[0].place_id,
});

await Bun.write(
  `./data/google-maps/place_details.json`,
  JSON.stringify(placeDetails)
);
