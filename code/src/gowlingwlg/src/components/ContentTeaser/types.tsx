import { ComponentProps } from 'lib/component-props';
import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export type tileType = {
  fields: {
    Description: Field<string>;
    Link: LinkField;
    Title: Field<string>;
  };
};

export type ContentTeaserProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    CTAList: Array<tileType>;
  };
};
