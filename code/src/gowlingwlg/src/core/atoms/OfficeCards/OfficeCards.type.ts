import { TextField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type OfficeAddressCardsProps = ComponentProps & {
  fields: {
    data: {
      dataSource: {
        offices: {
          targetItems: Array<OfficeCardItems>;
        };
      };
      MapIcon: {
        children: {
          results: Array<MapIcons>;
        };
      };
    };
  };
};
export type MapIcons = {
  name: {
    image: {
      jsonValue: {
        value: {
          src: string;
          alt: string;
          width: string;
          height: string;
        };
      };
    };
  };
};

export type OfficeCardItems = {
  CityTitle: {
    jsonValue: {
      value: string;
    };
  };
  OfficeAddress1: {
    jsonValue: TextField;
  };
  OfficeAddress2: {
    jsonValue: TextField;
  };
  OfficeAddress3: {
    jsonValue: TextField;
  };
  PhoneNumber: {
    jsonValue: Field<string>;
  };
  FaxNumber: {
    jsonValue: Field<string>;
  };
  MapURL: {
    jsonValue: {
      value: {
        text: string;
        anchor: string;
        linktype: string;
        class: string;
        title: string;
        target: string;
        querystring: string;
        id: string;
        href: string;
      };
    };
  };
};
