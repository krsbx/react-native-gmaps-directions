import type { MapViewDirectionsParams } from './types';

export const waypointToQuery = (options: MapViewDirectionsParams) => {
  let waypoints = '';

  if (Array.isArray(options.waypoints)) {
    waypoints = options.waypoints
      .map((waypoint) => {
        if (
          typeof waypoint === 'object' &&
          Object.values(waypoint).length === 2
        ) {
          return Object.values(waypoint).join(',');
        }

        return waypoint.toString();
      })
      .join(options.avoidStop ? '|via:' : '|');
  }

  if (options.avoidStop) {
    waypoints = `via:${waypoints}`;
  }

  if (options.optimizeWaypoints) {
    waypoints = `optimize:true|${waypoints}`;
  }

  return waypoints;
};
