import { useMemo } from 'react';
import { ComponentProps } from 'lib/component-props';
import Mapbox from 'core/molecules/Mapbox';
import { MarkerType } from 'core/molecules/Mapbox/map.types';
import ObjectHash from 'object-hash';
import { AlternateImage } from 'src/global';

type JsonValue = {
  jsonValue: {
    value: string;
  };
};

export type GlobalMapProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        id: string;
        PinnedOfficeLocations: {
          targetItems: {
            Address1: JsonValue;
            Address2: JsonValue;
            Address3: JsonValue;
            BuildingName: JsonValue;
            City: JsonValue;
            DXForUkOnly: JsonValue;
            Fax: JsonValue;
            Latitude: JsonValue;
            Longitude: JsonValue;
            MapLink: {
              jsonValue: {
                value: {
                  href: string;
                  linktype: string;
                  url: string;
                };
              };
            };
            AlternateImage: {
              jsonValue: {
                value: AlternateImage;
              };
            };
            Mobile: JsonValue;
            Phone: JsonValue;
            PostalCode: JsonValue;
            State: JsonValue;
            title: JsonValue;
            Image: JsonValue;
          }[];
        };
      };
    };
  };
};

const GlobalMap = (props: GlobalMapProps): JSX.Element => {
  const oh = ObjectHash(props);
  const markers = useMemo(() => {
    const locations = props.fields?.data?.datasource?.PinnedOfficeLocations?.targetItems ?? [];
    return locations.reduce((acc, location, index): MarkerType[] => {
      const lat = parseFloat(location?.Latitude?.jsonValue?.value);
      const lng = parseFloat(location?.Longitude?.jsonValue?.value);
      const locationImageUrl = location?.Image?.jsonValue?.value;

      if (!isNaN(lat) && !isNaN(lng)) {
        return [
          ...acc,
          {
            id: `${lat}_${lng}_${index}`,
            position: { lat, lng },
            content: {
              title: location.title.jsonValue.value,
              building: location.BuildingName.jsonValue.value,
              address1: location.Address1.jsonValue.value,
              address2: location.Address2.jsonValue.value,
              phone: location.Phone.jsonValue.value,
              mobile: location.Mobile.jsonValue.value,
              fax: location.Fax.jsonValue.value,
            },
            alternateImage: {
              src: location.AlternateImage.jsonValue.value.src,
              width: location.AlternateImage.jsonValue.value.width,
              height: location.AlternateImage.jsonValue.value.height,
              alt: location.AlternateImage.jsonValue.value.alt,
            },
            locationImageUrl,
          },
        ];
      }

      return acc;
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oh]);

  return (
    <div className="grid gap-x-1.5 md:gap-x-5 max-w-[75rem] 2xl:max-w-[90rem] mx-[1.375rem] md:mx-[2.125rem] xl:mx-auto">
      <Mapbox markers={markers} />
    </div>
  );
};

GlobalMap.displayName = 'GlobalMap';

export default GlobalMap;
