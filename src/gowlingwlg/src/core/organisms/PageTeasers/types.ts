import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
interface FieldValue<T> {
  jsonValue: TextField | undefined;
  value: T;
}

type PageReferencesType = {
  fields: {
    Content: Field<string>;
    Title: Field<string>;
    ThumbnailImage: ImageField;
  };
  url: string;
};

export enum bgType {
  white = 'bg-white',
  mainPurple = 'bg-mainPurple',
}

export type styleType = {
  testColor: string;
  tileCardBg: string;
};

export type RecentInsightType = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    PageReferences: Array<PageReferencesType>;
  };
};

export type SectorType = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    PageReferences: Array<PageReferencesType>;
    CTALink: FieldValue<string>;
  };
};
