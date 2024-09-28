import * as cheerio from 'cheerio';

export class TripAdvisorScraper {
  async getSearchPageHtml() {
    const response = await fetch(this.searchCafesUrl);
    const data = await response.text();
    const $ = cheerio.load(data);
    return $.html();
  }

  private readonly searchCafesUrl =
    'https://www.tripadvisor.com/FindRestaurants?geo=293984&establishmentTypes=9900&broadened=false';
}

const searchPageHtml = await new TripAdvisorScraper().getSearchPageHtml();
await Bun.write('data/search-cafes.html', searchPageHtml);
