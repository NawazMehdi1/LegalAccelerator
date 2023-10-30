import { Field, ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export type hoverOverCardsType = {
  CTALink: { jsonValue: LinkField };
  Description: { jsonValue: Field<string> };
  Image: { jsonValue: ImageField };
  Title: { jsonValue: Field<string> };
};

type HoverOverCardsComponentType = {
  children: { results: hoverOverCardsType[] };
  Description: { jsonValue: Field<string> };
  Title: { jsonValue: Field<string> };
};

export type HoverOverCardsTypes = ComponentProps & {
  fields: {
    data: {
      datasource: HoverOverCardsComponentType;
    };
  };
};
