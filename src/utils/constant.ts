export const WAYPOINT_LIMIT = 10;

export const BASE_URL = 'https://maps.googleapis.com/maps/api/directions/json';

export const AVOID_TYPES = {
  TOLLS: 'TOLLS',
  HIGHWAYS: 'HIGHWAYS',
  FERRIES: 'FERRIES',
} as const;

export const DIRECTION_MODE = {
  DRIVING: 'DRIVING',
  BICYCLING: 'BICYCLING',
  TRANSIT: 'TRANSIT',
  WALKING: 'WALKING',
} as const;

export const TIME_PRECISION = {
  NOW: 'now',
  NONE: 'none',
} as const;

export const PRECISION = {
  HIGH: 'high',
  LOW: 'low',
} as const;
