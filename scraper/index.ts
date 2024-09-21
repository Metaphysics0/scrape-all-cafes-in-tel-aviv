import { sleep } from 'bun';
import { telAvivNeighborhoodToCoordinatesMap } from './constants';

interface PlaceData {
  next_page_token?: string;
  results: any[];
}

export class GooglePlacesScraper {
  public async searchAllNeighborhoods() {
    const result = [];
    for (const [neighborhood, [xCoord, yCoord]] of Object.entries(
      telAvivNeighborhoodToCoordinatesMap
    )) {
      console.log(`performing search for: ${neighborhood}`);
      try {
        const firstPageData = await this.performInitialNearbySearch({
          xCoord,
          yCoord,
        });
        const allData = await this.getAllRemainingPages(firstPageData);
        result.push(allData);
      } catch (error) {
        console.error(`Error fetching data for ${neighborhood}:`, error);
      }
    }

    return result;
  }

  private async performInitialNearbySearch({
    xCoord,
    yCoord,
  }: {
    xCoord: number;
    yCoord: number;
  }): Promise<PlaceData> {
    const url = `${this.baseUrl}?keyword=coffee&location=${xCoord}%2C${yCoord}&radius=${this.radiusInMeters}&type=cafe&key=${process.env.GOOGLE_PLACES_API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error performing initial nearby search:', error);
      throw error;
    }
  }

  private async getAllRemainingPages(initialData: PlaceData): Promise<any[]> {
    const finalResult = [initialData];

    if (initialData.next_page_token) {
      await sleep(4000);
      try {
        const nextPageData = await this.getNextPageData(
          initialData.next_page_token
        );
        const nextPageResults = await this.getAllRemainingPages(nextPageData);
        finalResult.push(...nextPageResults);
      } catch (error) {
        console.error('Error fetching next page data:', error);
      }
    }

    return finalResult;
  }

  private async getNextPageData(nextPageToken: string): Promise<PlaceData> {
    console.log('getting next page data');

    const nextPageUrl = `${this.baseUrl}?pagetoken=${nextPageToken}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
    try {
      const response = await fetch(nextPageUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error getting next page data:', error);
      throw error;
    }
  }

  private readonly radiusInMeters = 20000;
  private readonly baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
}
