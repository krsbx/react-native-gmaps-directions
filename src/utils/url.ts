import { BASE_URL, DIRECTION_MODE, PRECISION } from './constant';
import { waypointToQuery } from './query';
import type { MapViewDirectionsParams } from './types';

export const convertUrl = ({
  mode = DIRECTION_MODE.DRIVING,
  precision = PRECISION.LOW,
  language = 'en',
  directionsServiceBaseUrl = BASE_URL,
  ...options
}: MapViewDirectionsParams) => {
  const query: string[] = [];
  const waypoints = waypointToQuery(options);

  let url = directionsServiceBaseUrl;

  if (typeof options.apikey === 'string' && options.apikey.trim() !== '') {
    query.push(`key=${options.apikey}`);
  }

  if (waypoints.trim() !== '') {
    query.push(`waypoints=${waypoints}`);
  }

  if (typeof options.origin === 'string' && options.origin.trim() !== '') {
    query.push(`origin=${options.origin}`);
  }

  if (
    typeof options.origin === 'object' &&
    Object.values(options.origin).length === 2
  ) {
    query.push(`origin=${Object.values(options.origin).join(',')}`);
  }

  if (
    typeof options.destination === 'string' &&
    options.destination.trim() !== ''
  ) {
    query.push(`destination=${options.destination}`);
  }

  if (
    typeof options.destination === 'object' &&
    Object.values(options.destination).length === 2
  ) {
    query.push(`destination=${Object.values(options.destination).join(',')}`);
  }

  if (Array.isArray(options.avoid)) {
    query.push(
      `avoid=${options.avoid.map((av) => av.toLowerCase()).join('|')}`
    );
  }

  if (typeof mode === 'string' && mode.trim() !== '') {
    query.push(`mode=${mode.toLowerCase()}`);
  }

  if (typeof language === 'string' && language.trim() !== '') {
    query.push(`language=${language}`);
  }

  if (typeof options.region === 'string' && options.region.trim() !== '') {
    query.push(`region=${options.region}`);
  }

  if (
    typeof options.timePrecision === 'string' &&
    options.timePrecision.trim() !== ''
  ) {
    query.push(`departure_time=${options.timePrecision.trim()}`);
  }

  if (typeof options.channel === 'string' && options.channel.trim()) {
    query.push(`channel=${options.channel}`);
  }

  if (query.length) {
    url += `?${query.join('&')}`;
  }

  return url;
};
