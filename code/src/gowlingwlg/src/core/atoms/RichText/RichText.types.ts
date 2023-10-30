import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};
