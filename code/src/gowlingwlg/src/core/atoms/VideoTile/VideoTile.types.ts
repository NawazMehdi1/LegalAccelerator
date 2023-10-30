import { TextField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type VideoSeriesProps = ComponentProps & {
  fields: {
    data: {
      item: {
        name: string;
        SeeAllCTA: {
          jsonValue: {
            value: {
              text?: string;
              anchor?: string;
              linktype?: string;
              class?: string;
              title?: string;
              target?: string;
              querystring?: string;
              href?: string;
            };
          };
        };
        series: {
          targetItems: Array<SliderCardsType>;
        };
      };
    };
  };
};

export type SliderCardsType = {
  parent: {
    parent: {
      title: TextField;
    };
  };
  videoId: {
    value: Field<string>;
  };
  TileCTA: {
    jsonValue: {
      value: {
        text?: string;
        anchor?: string;
        linktype?: string;
        class?: string;
        title?: string;
        target?: string;
        querystring?: string;
        href?: string;
      };
    };
  };
};
