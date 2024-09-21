export enum TelAvivNeighborhoods {
  JAFFA = 'jaffa',
  FLORENTIN = 'florentin',
  SHENKIN = 'shenkin',
  DIZINGOFF = 'dizingoff',
  OLD_NORTH = 'old_north',
  OLD_NEW_NORTH = 'old_new_north',
}

export const telAvivNeighborhoodToCoordinatesMap: NeighboorhoodToCoordinateMap =
  {
    [TelAvivNeighborhoods.JAFFA]: [32.053807, 34.756073],
    [TelAvivNeighborhoods.FLORENTIN]: [32.05674, 34.768815],
    [TelAvivNeighborhoods.SHENKIN]: [32.06979, 34.770855],
    [TelAvivNeighborhoods.DIZINGOFF]: [32.080594, 34.775844],
    [TelAvivNeighborhoods.OLD_NEW_NORTH]: [32.090453, 34.790655],
    [TelAvivNeighborhoods.OLD_NORTH]: [32.089116, 34.776259],
  } as const;

export type NeighboorhoodToCoordinateMap = Record<string, [number, number]>;
