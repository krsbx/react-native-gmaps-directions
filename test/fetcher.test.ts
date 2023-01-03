import _ from 'lodash';
import { fetchRoutesData } from '../src/utils/fetcher';
import type { LatLngString } from '../src/utils/types';
import { WAYPOINTS } from './constant';

const randomPick = (pick: number) =>
  _.sampleSize(WAYPOINTS, pick) as unknown as LatLngString[];

describe('Fetch routes data from the given data', () => {
  it('Can fetch a routes with origin and destination only', async () => {
    const result = await fetchRoutesData({
      apikey: process.env.API_KEY!,
      origin: '-37.7843905,144.8968929',
      destination: '-37.8289573,144.9576612',
    });

    expect(result?.coordinates.length).toBeGreaterThanOrEqual(2);
  });

  it('Can fetch a routes with origin, destination, and 1 waypoints', async () => {
    const result = await fetchRoutesData({
      apikey: process.env.API_KEY!,
      origin: '-37.7843905,144.8968929',
      destination: '-37.8289573,144.9576612',
      waypoints: randomPick(1),
    });

    expect(result?.waypointOrder.length).toBeGreaterThanOrEqual(1);
  });

  it('Can fetch a routes with origin, destination, and 2 waypoints', async () => {
    const result = await fetchRoutesData({
      apikey: process.env.API_KEY!,
      origin: '-37.7843905,144.8968929',
      destination: '-37.8289573,144.9576612',
      waypoints: randomPick(2),
    });

    expect(result?.waypointOrder.length).toBeGreaterThanOrEqual(2);
  });

  it('Can fetch a routes with origin, destination, and 3 waypoints', async () => {
    const result = await fetchRoutesData({
      apikey: process.env.API_KEY!,
      origin: '-37.7843905,144.8968929',
      destination: '-37.8289573,144.9576612',
      waypoints: randomPick(3),
    });

    expect(result?.waypointOrder.length).toBeGreaterThanOrEqual(3);
  });

  it('Can fetch a routes with origin, destination, and 4 waypoints', async () => {
    const result = await fetchRoutesData({
      apikey: process.env.API_KEY!,
      origin: '-37.7843905,144.8968929',
      destination: '-37.8289573,144.9576612',
      waypoints: randomPick(4),
    });

    expect(result?.waypointOrder.length).toBeGreaterThanOrEqual(4);
  });
});
