import { Field, TextField, ImageField, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface JsonValueField<T> {
  jsonValue: Field<T>;
}

export type TitleCardProps = ComponentProps & {
  fields: {
    data: {
      item: {
        title: { jsonValue: TextField };
        subTitle: { jsonValue: RichTextField };
        pageType: {
          targetItem: {
            pageType: TextField;
            icon: { jsonValue: ImageField };
          };
        };
        ShowReadTime: { jsonValue: { value: boolean } };
        publishedDate: JsonValueField<string>;
        publishedDateOverrideText: { jsonValue: TextField };
        readTime: { jsonValue: TextField };
        image: { jsonValue: ImageField };
        backgroundImage: { jsonValue: ImageField };
      };
      icons: {
        children: {
          results: {
            name: string;
            image: {
              jsonValue: ImageField;
            };
          }[];
        };
      };
    };
  };
};

export interface DataLayerEvent {
  event: string;
  insight_type: string | number | undefined;
  insight_title?: string | number | undefined;
  insight_authors?: string;
}
export enum bgType {
  white = 'bg-white',
  extraLightGrey = 'bg-extraLightGrey',
  mainPurple = 'bg-mainPurple',
  lightPurple = 'bg-lightPurple',
}

export type styleType = {
  testColor: string;
  tileCardBg: string;
  fill: string;
};

export interface BreadcrumbItem {
  Title: string;
  Url: string;
}
