import { ComponentProps } from 'lib/component-props';
import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

type PageReferencesType = {
  url: { url: string };
  Title: { jsonValue: { value: string } };
  SubTitle: { jsonValue: { value: string } };
  Image: { jsonValue: ImageField };
  pageType: {
    targetItem: {
      pageType: { value: string };
      icon: { jsonValue: { value: string } };
    };
  };
  PublishedDate: { jsonValue: { value: string } };
  RelatedTopics: { targetItems: Array<{ Title: { jsonValue: { value: string } } }> };
};

export type RecentInsightsProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        CTALink: { jsonValue: LinkField };
        title: { jsonValue: { value: string } };
        description: { jsonValue: { value: string } };
        PageReferences: { targetItems: Array<PageReferencesType> };
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
