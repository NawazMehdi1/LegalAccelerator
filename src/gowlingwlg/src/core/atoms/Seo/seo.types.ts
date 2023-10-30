import { NextSeoProps } from 'next-seo';

export interface SeoProps extends NextSeoProps {
  OpenGraphTitle: FieldType;
  OpenGraphDescription: FieldType;
  OpenGraphImageUrl: { value: ImageField };
  Title: FieldType;
}

export type FieldType = {
  value: string;
};

type ImageField = {
  alt: string;
  height: string;
  src: string;
  width: string;
};
