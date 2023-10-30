import { LinkField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

export type ResultsFieldLink = {
  field: {
    link: LinkField;
  };
};

export interface Fields {
  data: {
    datasource: {
      children: {
        results: ResultsFieldLink[];
      };
      field: {
        title: TextField;
      };
    };
  };
}

export type LinkListProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export type LinkListItemProps = {
  total: number;
  field: LinkField;
};
