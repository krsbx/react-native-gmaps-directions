import { useCallback } from 'react';
import { fetchRoutesData } from '../utils/fetcher';
import { MapViewDirectionsParams } from '../utils/types';

const useRouteFetcher = (apikey: string) => {
  const getNewRoute = useCallback(
    (params: Omit<MapViewDirectionsParams, 'apikey'>) => {
      return fetchRoutesData({ ...params, apikey });
    },
    [apikey]
  );

  return getNewRoute;
};

export default useRouteFetcher;
