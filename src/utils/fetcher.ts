import axios from 'axios';
import { convertUrl } from './url';
import type { LatLng, MapViewDirectionsParams } from './types';
import { resolveRoutes } from './resolver';
import { convertWaypoint } from './waypoint';

export const fetchRoute = async (options: MapViewDirectionsParams) => {
  const url = convertUrl(options);

  try {
    const json = await (await axios.get(url)).data;

    if (json.status !== 'OK') {
      const errorMessage = json.error_message || json.status || 'Unknown error';

      return Promise.reject(errorMessage);
    }

    if (!json.routes.length) {
      return Promise.reject();
    }

    const route = json.routes[0];

    return Promise.resolve(
      resolveRoutes({ ...(route || {}), precision: options.precision })
    );
  } catch (err) {
    return Promise.reject(`Error on GMAPS route request: ${err}`);
  }
};

export const fetchRoutes = async (
  options: MapViewDirectionsParams & { index: number }
) => {
  if (options.index === 0)
    options?.onStart?.({
      origin: options.origin,
      destination: options.destination,
      waypoints: options.waypoints,
    });

  try {
    const result = await fetchRoute(options);

    return result;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchRoutesData = async (options: MapViewDirectionsParams) => {
  const {
    origin: initialOrigin,
    destination: initialDestination,
    waypoints: initialWaypoints = [],
    splitWaypoints = true,
    timePrecision = 'none',
    onError,
    onReady,
    ...rest
  } = options;

  if (!rest.apikey) {
    console.warn(`MapViewDirections Error: Missing API Key`);
    return;
  }

  if (!initialOrigin || !initialDestination) {
    return;
  }

  const routes = convertWaypoint({
    splitWaypoints,
    initialDestination,
    initialOrigin,
    initialWaypoints,
  });

  try {
    const response = await Promise.all(
      routes.map(({ destination, origin, waypoints }, index) =>
        fetchRoutes({
          ...rest,
          timePrecision,
          destination,
          origin,
          waypoints,
          index,
        })
      )
    );

    // Combine all Directions API Request results into one
    const result = response.reduce(
      (acc, { distance, duration, coordinates, fare, legs, waypointOrder }) => {
        if (fare) acc.fares.push(fare);

        acc.coordinates.push(...coordinates);
        acc.waypointOrder = acc.waypointOrder.concat(waypointOrder);

        acc.distance += distance;
        acc.duration += duration;
        acc.legs = legs;

        return acc;
      },
      {
        coordinates: [] as LatLng[],
        distance: 0,
        duration: 0,
        fares: [] as google.maps.TransitFare[],
        legs: [] as google.maps.DirectionsLeg[],
        waypointOrder: [] as number[],
      }
    );

    onReady?.(result);

    return result;
  } catch (err) {
    console.warn(`MapViewDirections Error: ${err}`);

    onError?.(err);
  }
};
