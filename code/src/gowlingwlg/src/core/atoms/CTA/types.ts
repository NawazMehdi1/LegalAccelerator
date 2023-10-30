import { Field, LinkField, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type CTAProps = ComponentProps & {
  params: {
    Styles: Field<string>;
    MediumWidthWhiteBgMedPurpleCta: Field<string>;
  };
  fields: {
    Description: Field<string>;
    CTALink: LinkField;
    CTALink2: LinkField;
    Image: ImageField;
    Title: Field<string>;
    AlertTitle: Field<string>;
    AlertDescription: Field<string>;
    ExternalLinkToolTipText: Field;
  };
};

export interface DataLayerEvent {
  event: string;
  cta_text?: string | undefined;
  cta_url?: string | undefined;
}

export const handleCtaClick = (ctatext: string | undefined, url: string | undefined) => {
  const eventData: DataLayerEvent = {
    event: 'contact_us_cta_initiated',
    cta_text: ctatext,
    cta_url: url,
  };
  window.dataLayer.push(eventData);
};
