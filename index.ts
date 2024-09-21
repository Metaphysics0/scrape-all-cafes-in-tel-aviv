import { GooglePlacesScraper } from './scraper';

void (async (): Promise<void> => {
  try {
    await scrape();
  } catch (err) {
    console.error('ERROR', err);
  } finally {
    console.log('DONE');
    process.exit();
  }
})();

async function scrape() {
  const scraper = new GooglePlacesScraper();
  const data = await scraper.searchAllNeighborhoods();
  await Bun.write(
    `./data/scraped-data__${Date.now()}.txt`,
    JSON.stringify(data)
  );
}
