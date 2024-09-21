import data from '../data/scraped-data__1726946090388.json';
import _ from 'lodash';

async function formatData() {
  const flattenedData = data.flat().flatMap((a) => a.results);
  const uniquePlaces = _.uniqBy(flattenedData, 'place_id');
  await Bun.write('data/flattened-data.json', JSON.stringify(uniquePlaces));
}

await formatData();
