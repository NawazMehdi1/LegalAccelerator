import { ComponentProps } from 'lib/component-props';
import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

type PageReferencesType = {
  summary: { jsonValue: { value: string } };
  title: { jsonValue: { value: string } };
  image: { jsonValue: ImageField };
  pageType: {
    targetItem: {
      pageType: { value: string };
      icon: { jsonValue: { value: string } };
    };
  };
  publishedDate: { jsonValue: { value: string } };
  relatedTopics: { targetItems: Array<{ title: { jsonValue: { value: string } } }> };
};

export type ArticleTeaserProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        cTALink: { jsonValue: LinkField };
        title: { jsonValue: { value: string } };
        description: { jsonValue: { value: string } };
        pageReferences: { targetItems: Array<PageReferencesType> };
      };
    };
  };
};

export enum bgType {
  white = 'bg-white',
  mainPurple = 'bg-mainPurple',
}

export type styleType = {
  testColor: string;
  tileCardBg: string;
  fill: string;
};
