import { Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type AccordianType = {
  CallToAction: {
    jsonValue: LinkField;
  };
  Description: {
    jsonValue: Field<string>;
  };
  title: {
    jsonValue: Field<string>;
  };
};

export type ContentAccordionType = ComponentProps & {
  fields: {
    data: {
      datasource: {
        referenceItem: {
          targetItems: AccordianType[];
        };
      };
    };
  };
};
