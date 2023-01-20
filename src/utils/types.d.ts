import { type LineCapType, type LineJoinType } from 'react-native-maps';
import type {
  AVOID_TYPES,
  DIRECTION_MODE,
  PRECISION,
  TIME_PRECISION,
  TRAFFIC_MODEL,
} from './constant';

export type KeyOf<T> = keyof T;

export type ValueOf<T> = T[KeyOf<T>];

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type LatLngString = LatLng | [number, number] | string;

export type Result = {
  coordinates: LatLng[];
  distance: number;
  duration: number;
  fares: google.maps.TransitFare[];
  legs: google.maps.DirectionsLeg[];
  waypointOrder: number[];
};

export type PolyLine = {
  strokeWidth?: number;
  strokeColor?: string;
  strokeColors?: string[];
  lineCap?: LineCapType;
  lineJoin?: LineJoinType;
  miterLimit?: number;
  geodesic?: boolean;
  lineDashPhase?: number;
  lineDashPattern?: number[];
  tappable?: boolean;
};

export type MapViewDirectionsParams = {
  origin?: LatLngString;
  waypoints?: LatLngString[];
  destination?: LatLngString;
  apikey: string;
  avoid?: ValueOf<typeof AVOID_TYPES>;
  mode?: ValueOf<typeof DIRECTION_MODE>;
  language?: string;
  resetOnChange?: boolean;
  optimizeWaypoints?: boolean;
  splitWaypoints?: boolean;
  directionsServiceBaseUrl?: string;
  region?: string;
  precision?: ValueOf<typeof PRECISION>;
  timePrecision?: ValueOf<typeof TIME_PRECISION> | string;
  trafficModel?: ValueOf<typeof TRAFFIC_MODEL>;
  channel?: string;
  onReady?: (result: Result) => void;
  onStart?: (args: {
    origin?: LatLngString;
    destination?: LatLngString;
    waypoints?: LatLngString[];
  }) => void;
  onError?: (...args: unknown[]) => void;
};

export type MapViewDirectionsProps = PolyLine & MapViewDirectionsParams;
