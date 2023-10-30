import { ImageField, LinkField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

interface FieldValue<T> {
  jsonValue: TextField | undefined;
  value: T;
}

export type AuthorProps = {
  fields: {
    data: { item: { KeyContacts: { targetItems: AuthorCardsProps[] } } };
  };
  params: {
    FieldNames: string;
    OverrideTitle: string;
    CarouselConversionLimit: number;
  };
};

export type AuthorCardsProps = {
  alternateTitle: FieldValue<string>;
  title: FieldValue<string>;
  AdditionalOffices: FieldValue<string>;
  linkedIn: { jsonValue: LinkField };
  url: { path: string };
  role: TextField;
  profileImage: {
    jsonValue: ImageField;
  };
  professionalTitle: {
    targetItem: {
      title: FieldValue<string>;
    };
  };
  offices: {
    targetItems: OfficeType[];
  };
};
export type OfficeType = {
  title: FieldValue<string>;
};
