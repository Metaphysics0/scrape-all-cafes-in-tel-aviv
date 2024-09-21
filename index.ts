import { GooglePlacesScraper } from './scraper';
import { telAvivNeighborhoodToCoordinatesMap } from './constants/tel-aviv-neighborhood-to-coordinates-map.constant';

async function scrape(): Promise<void> {
  try {
    const scraper = new GooglePlacesScraper();
    const data = await scraper.searchAllNeighborhoods({
      neighborhoodToCoordinateMap: telAvivNeighborhoodToCoordinatesMap, // replace this if you want!
    });
    await Bun.write(
      `./data/scraped-data__${Date.now()}.txt`,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error('Error scraping!', error);
  }
}

await scrape();
