import { PRECISION } from './constant';
import { decode } from './decoder';
import type { LatLng, ValueOf } from './types';

export const resolveRoutes = ({
  precision = PRECISION.LOW,
  ...route
}: google.maps.DirectionsRoute & {
  precision: ValueOf<typeof PRECISION>;
}) => ({
  distance:
    route.legs.reduce(
      (carry, curr) => carry + (curr?.distance?.value ?? 0),
      0
    ) / 1000,
  duration:
    route.legs.reduce(
      (carry, curr) =>
        carry +
        (curr.duration_in_traffic
          ? curr.duration_in_traffic.value
          : curr.duration?.value ?? 0),
      0
    ) / 60,
  coordinates:
    precision === PRECISION.LOW
      ? decode([
          {
            polyline:
              route.overview_polyline as unknown as google.maps.DirectionsPolyline,
          },
        ])
      : route.legs.reduce(
          (carry, curr) => [...carry, ...decode(curr.steps)],
          [] as LatLng[]
        ),
  fare: route.fare,
  waypointOrder: route.waypoint_order,
  legs: route.legs,
});
