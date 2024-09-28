import { telAvivNeighborhoodToCoordinatesMap } from './constants/tel-aviv-neighborhood-to-coordinates-map.constant';
import { GooglePlacesScraper } from './scrapers/google-maps';

async function scrape(): Promise<void> {
  try {
    const googleMapsScraper = new GooglePlacesScraper({
      neighborhoodToCoordinateMap: telAvivNeighborhoodToCoordinatesMap, // replace this if you want!
    });
    const { data, fileName } = await googleMapsScraper.scrape();
    await Bun.write(`./data/google-maps/${fileName}`, data);
  } catch (error) {
    console.error('Error scraping!', error);
  }
}

await scrape();
