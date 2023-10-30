import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { getUserCountryCode } from './utils';
import { MapProps } from './map.types';
import LoadingPanel from './LoadingPanel';
import MapContainer from './MapContainer';

const GoogleMaps = dynamic(() => import('./GoogleMaps'), {
  loading: () => <LoadingPanel />,
});

const BaiduMaps = dynamic(() => import('./BaiduMaps'), {
  loading: () => <LoadingPanel />,
});

const Mapbox = ({ markers }: MapProps) => {
  const { isReady, query } = useRouter();
  const mockCode = (query?.l as string)?.toUpperCase();
  const [isChina, setChina] = useState<boolean>();
  const isUndefined = typeof isChina === 'undefined';

  const checkForChina = useCallback(async () => {
    if (isUndefined && isReady) {
      const countryCode = await getUserCountryCode();
      setChina((mockCode || countryCode) === 'CN');
    }
  }, [isUndefined, isReady, mockCode]);

  useEffect(() => {
    checkForChina();
  }, [checkForChina]);

  if (isUndefined) {
    return (
      <MapContainer>
        <LoadingPanel />
      </MapContainer>
    );
  }

  if (isChina) {
    return <BaiduMaps markers={markers} />;
  }

  return (
    <MapContainer>
      <GoogleMaps markers={markers} />
    </MapContainer>
  );
};

export default Mapbox;
