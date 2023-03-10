import { WAYPOINT_LIMIT } from './constant';
import type { LatLngString } from './types';

// Ref: https://github.com/bramus/react-native-maps-directions/blob/master/src/MapViewDirections.js#L114
export const convertWaypoint = ({
  splitWaypoints,
  initialDestination,
  initialOrigin,
  initialWaypoints,
}: {
  splitWaypoints: boolean;
  initialOrigin: LatLngString;
  initialDestination: LatLngString;
  initialWaypoints: LatLngString[];
}) => {
  // Routes array which we'll be filling.
  // We'll perform a Directions API Request for reach route
  const routes: {
    waypoints: LatLngString[];
    origin: LatLngString;
    destination: LatLngString;
  }[] = [];

  // We need to split the waypoints in chunks, in order to not exceede the max waypoint limit
  // ~> Chunk up the waypoints, yielding multiple routes
  if (
    splitWaypoints &&
    initialWaypoints &&
    initialWaypoints.length > WAYPOINT_LIMIT
  ) {
    // Split up waypoints in chunks with chunksize WAYPOINT_LIMIT
    const chunckedWaypoints = initialWaypoints.reduce(
      (accumulator, waypoint, index) => {
        const numChunk = Math.floor(index / WAYPOINT_LIMIT);
        accumulator[numChunk] = ([] as LatLngString[]).concat(
          accumulator[numChunk] || [],
          waypoint
        );

        return accumulator;
      },
      [] as LatLngString[][]
    );

    // Create routes for each chunk, using:
    // - Endpoints of previous chunks as startpoints for the route (except for the first chunk, which uses initialOrigin)
    // - Startpoints of next chunks as endpoints for the route (except for the last chunk, which uses initialDestination)
    for (let i = 0; i < chunckedWaypoints.length; i++) {
      routes.push({
        waypoints: chunckedWaypoints[i],
        origin:
          i === 0
            ? initialOrigin
            : chunckedWaypoints[i - 1][chunckedWaypoints[i - 1].length - 1],
        destination:
          i === chunckedWaypoints.length - 1
            ? initialDestination
            : chunckedWaypoints[i + 1][0],
      });
    }
  } else {
    // No splitting of the waypoints is requested/needed.
    // ~> Use one single route
    routes.push({
      waypoints: initialWaypoints,
      origin: initialOrigin,
      destination: initialDestination,
    });
  }

  return routes;
};
