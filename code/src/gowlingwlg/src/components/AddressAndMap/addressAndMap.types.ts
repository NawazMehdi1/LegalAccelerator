import { ComponentProps } from 'lib/component-props';
import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type AddressIconType = {
  id: string;
  name: string;
  MapIcon: {
    jsonValue: {
      value: {
        src: string;
        alt: string;
      };
    };
  };
};
export type AddressAndMapProps = ComponentProps & {
  params: {
    OverrideTitle: string;
  };
  fields: {
    data: {
      dataSource: {
        Title: {
          jsonValue: {
            value: string;
          };
        };
        BuildingName: {
          jsonValue: {
            value: string;
          };
        };
        OfficeAddress1: {
          jsonValue: {
            value: string;
          };
        };
        OfficeAddress2: {
          jsonValue: {
            value: string;
          };
        };
        OfficeAddress3: {
          jsonValue: {
            value: string;
          };
        };
        City: {
          jsonValue: {
            value: string;
          };
        };
        State: {
          jsonValue: {
            value: string;
          };
        };
        PostalCode: {
          jsonValue: {
            value: string;
          };
        };
        Country: {
          jsonValue: {
            value: string;
          };
        };
        PhoneNumber: {
          jsonValue: {
            value: string;
          };
        };
        FaxNumber: {
          jsonValue: {
            value: string;
          };
        };
        Image: {
          jsonValue: ImageField;
        };
        MapURL: {
          jsonValue: {
            value: {
              src: string;
              href: string;
              text: string;
            };
          };
        };
      };
    };
  };
};
