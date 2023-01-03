import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Polyline } from 'react-native-maps';
import { usePreviousValue } from '../index';
import { fetchRoutesData } from '../utils/fetcher';
import type { LatLng, MapViewDirectionsProps } from '../utils/types';

const MapViewDirections = (props: MapViewDirectionsProps) => {
  const prevProps = usePreviousValue(props ?? {});
  const [coordinates, setCoordinates] = useState<LatLng[] | null>(null);

  const resetState = (cb: (() => void) | null = null) => {
    setCoordinates(null);

    cb?.();
  };

  useEffect(() => {
    fetchRoutesData(props).then((value) => {
      if (!value) return;

      setCoordinates(value.coordinates);
    });
  }, []);

  useEffect(() => {
    if (
      _.isEqual(prevProps?.origin, props.origin) &&
      _.isEqual(prevProps?.destination, props.destination) &&
      _.isEqual(prevProps?.waypoints, props.waypoints) &&
      _.isEqual(prevProps?.mode, props.mode) &&
      _.isEqual(prevProps?.precision, props.precision) &&
      _.isEqual(prevProps?.splitWaypoints, props.splitWaypoints) &&
      _.isEqual(prevProps?.avoid, props.avoid) &&
      _.isEqual(prevProps?.optimizeWaypoints, props.optimizeWaypoints)
    )
      return;

    if (props.resetOnChange === false) {
      fetchRoutesData(props).then((value) => {
        if (!value) return;

        setCoordinates(value.coordinates);
      });

      return;
    }

    resetState(() =>
      fetchRoutesData(props).then((value) => {
        if (!value) return;

        setCoordinates(value.coordinates);
      })
    );
  }, [
    props.origin,
    props.destination,
    props.waypoints,
    props.mode,
    props.precision,
    props.splitWaypoints,
    props.avoid,
    props.optimizeWaypoints,
  ]);

  if (!coordinates || !coordinates.length) return null;

  return (
    <Polyline
      coordinates={coordinates}
      {..._.omit(props, [
        'origin',
        'destination',
        'waypoints',
        'mode',
        'precision',
        'splitWaypoints',
        'avoid',
        'apikey',
        'onReady',
        'onError',
        'language',
        'region',
        'optimizeWaypoints',
      ])}
    />
  );
};

export default MapViewDirections;
