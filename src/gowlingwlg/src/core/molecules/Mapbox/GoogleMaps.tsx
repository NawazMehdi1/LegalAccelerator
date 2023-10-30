import { GoogleMap, InfoWindow, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import { MapProps, MarkerType } from './map.types';
import LoadingPanel from './LoadingPanel';
import { googleMapStyles } from './google-map-styles';
import OfficeIcon from 'core/atoms/Icons/OfficeIcon';

const API_KEY = process?.env?.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

const BREAKPOINTS = [
  {
    width: 300,
    zoom: 0.1,
    center: {
      lat: 44,
      lng: 6,
    },
  },
  {
    width: 700,
    zoom: 1.2,
    center: {
      lat: 45,
      lng: 6,
    },
  },
  {
    width: 1000,
    zoom: 1.8,
    center: {
      lat: 47,
      lng: 6,
    },
  },
  {
    width: 1200,
    zoom: 2.1,
    center: {
      lat: 46,
      lng: 6,
    },
  },
  {
    width: 1600,
    zoom: 2.3,
    center: {
      lat: 44,
      lng: 6,
    },
  },
];

function getMatchingBreakpoint(input: number) {
  const minimalBreakpoint = BREAKPOINTS[0];
  const largestBreakpoint = BREAKPOINTS[BREAKPOINTS.length - 1];

  if (input < minimalBreakpoint.width) {
    return minimalBreakpoint;
  }

  for (let i = 1; i < BREAKPOINTS.length; i++) {
    if (input < BREAKPOINTS[i].width) {
      return BREAKPOINTS[i - 1];
    }
  }

  return largestBreakpoint;
}

const GoogleMaps = ({ markers }: MapProps) => {
  const [breakpointConfig, setBreakpointConfig] = useState<(typeof BREAKPOINTS)[number]>();
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    preventGoogleFontsLoading: true,
  });

  const calculateZoom = useCallback(() => {
    const vw = window.innerWidth;
    const breakpoint = getMatchingBreakpoint(vw);

    if (breakpointConfig?.zoom !== breakpoint.zoom) {
      setBreakpointConfig(breakpoint);
    }
  }, [breakpointConfig]);

  useEffect(() => {
    calculateZoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('resize', calculateZoom, false);

    return () => {
      window.removeEventListener('resize', calculateZoom, false);
    };
  }, [calculateZoom]);

  if (isLoaded && breakpointConfig) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <GoogleMap
          zoom={breakpointConfig.zoom}
          center={breakpointConfig.center}
          options={{
            disableDefaultUI: true,
            styles: googleMapStyles,
            restriction: {
              latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
            },
            minZoom: breakpointConfig.zoom,
          }}
          mapContainerClassName="opacity-0 fadeIn absolute h-[calc(100%+2.5rem)] w-full top-[-1.25rem]"
          onClick={() => {
            setSelectedMarker(null);
          }}
        >
          {markers.map((marker) => (
            <MarkerF
              key={marker.id}
              position={marker.position}
              zIndex={99999}
              icon={{
                url: `${process.env.NEXT_PUBLIC_URL}marker.svg`,
                scale: 7,
              }}
              onClick={() => {
                setSelectedMarker(marker);
              }}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
            >
              <>
                <div className="flex flex-col shadow-md bg-white top-0">
                  <div className="relative">
                    <div className="justify-start items-center inline-flex w-full py-3.5 px-5">
                      <OfficeIcon />
                      <h5 className="text-stone-800 text-base font-bold ml-2.5">
                        {selectedMarker.content.title}
                      </h5>
                    </div>
                    <hr className="x" />
                    <p className="my-2.5 mx-5 text-stone-800 text-[0.625rem] font-normal leading-4">
                      {selectedMarker.content.building}
                      <br />
                      {selectedMarker.content.address1}
                      <br />
                      {selectedMarker.content.address2}
                    </p>
                    <div className="text-stone-800 text-[0.625rem] font-bold mx-5 mb-5 leading-4">
                      T: {selectedMarker.content.phone}
                      <br />
                      F: {selectedMarker.content.fax}
                    </div>
                  </div>
                </div>
                <div className="marker-pointer" />
              </>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  }

  return <LoadingPanel />;
};

export default GoogleMaps;
