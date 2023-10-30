import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, TextField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

type LanguageMappingType = {
  Code: { jsonValue: Field<string> };
  Name: { jsonValue: Field<string> };
};

type JurisdictionLanguageItemType = {
  Code: { jsonValue: Field<string> };
  Name: { jsonValue: Field<string> };
  Flag: { jsonValue: ImageField };
  FlagMobile: { jsonValue: ImageField };
  LanguageMapping: { targetItems: Array<LanguageMappingType> };
};

export type LanguageSelectorProps = ComponentProps & {
  fields: {
    data: {
      item: {
        heading: string;
        Description: { jsonValue: TextField };
        Title: { jsonValue: TextField };
        Jurisdiction: { targetItems: Array<JurisdictionLanguageItemType> };
        JurisdictionTitle: { jsonValue: TextField };
        Language: Array<JurisdictionLanguageItemType>;
        GlobalDirectUrl: { jsonValue: LinkField };
        LanguageTitle: { jsonValue: TextField };
      };
    };
  };
};

export type formType = {
  language: string;
  location: string;
};

type regionOptions = {
  [key: string]: string;
};

export const Regions: regionOptions = {
  en: 'Global',
  'fr-GB': 'Global',
  'de-GB': 'Global',
  'fr-CA-GB': 'Global',
  'en-CA': 'Canada',
  'fr-CA': 'Canada',
  'fr-FR-CA': 'Canada',
  'fr-FR': 'France',
  'en-FR': 'France',
  'en-DE': 'Germany',
  'de-DE': 'Germany',
  'en-AE': 'United Arab Emirates',
  'en-GB': 'United Kingdom',
  'en-US': 'USA',
  'fr-US': 'USA',
  'de-US': 'USA',
  'fr-CN': 'China',
  'en-CN': 'China',
  'de-CN': 'China',
};
