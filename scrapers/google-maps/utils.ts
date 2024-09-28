import _ from 'lodash';

export function removeDuplicatePlaces(data: any[]) {
  const flattenedData = data.flat().flatMap((a) => a.results);
  return _.uniqBy(flattenedData, 'place_id');
}
