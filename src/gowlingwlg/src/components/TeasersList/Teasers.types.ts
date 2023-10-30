import { TextField, LinkField, ImageField } from '@sitecore-jss/sitecore-jss-react';
import { ComponentProps } from 'lib/component-props';

export type TeaserProps = ComponentProps & {
  fields: {
    SelectedTeasers?: {
      id?: string;
      url?: string;
      fields: {
        Title?: TextField;
        Description?: TextField;
        CTA: LinkField;
        Image: ImageField;
      };
    }[];
  };
};
