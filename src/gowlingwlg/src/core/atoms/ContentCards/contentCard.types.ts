import { ComponentProps } from 'lib/component-props';
import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export type ContentCardsType = {
  id: string;
  content: {
    value: string;
  };
  title: {
    value: string;
  };
  summary: {
    value: string;
  };
  pageType: {
    jsonValue: {
      fields: {
        PageType: { value: string };
        Icon: ImageField;
      };
    };
  };
  publishedDate: {
    jsonValue: {
      value: string;
    };
  };
  image: {
    jsonValue: ImageField;
  };
  url: {
    url: string;
  };
};

export type ContentCardsProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        title: {
          value: string;
        };
        featuredContentCards: {
          targetItems: ContentCardsType[];
        };
      };
    };
  };
};
