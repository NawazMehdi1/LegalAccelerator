import { ComponentProps } from 'lib/component-props';
import { ImageField, TextField, Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type OfficeType = {
  title: {
    value: string;
  };
  url: {
    path: string;
  };
};
export type AdmissionGrandchildResult = {
  admissionName: {
    value: string;
  };
  startYear: {
    value: string;
  };
  admissionType: {
    value: string;
  };
};

export type AdmissionChildResult = {
  children?: {
    results?: AdmissionGrandchildResult[];
  };
};

export type AdmissionParentResult = {
  children?: {
    results?: AdmissionChildResult[];
  };
};

export type BarAdmissionType = {
  admissionName: {
    value: string;
  };
  startYear: {
    value: string;
  };
  admissionType: {
    value: string;
  };
};
export type SectorsType = {
  title: {
    value: string;
  };
  url: {
    path: string;
  };
};
export type ServicesType = {
  title: {
    value: string;
  };
  url: {
    path: string;
  };
};

type Icon = {
  name?: string;
  image: {
    jsonValue: ImageField;
  };
  TargetUrl?: {
    jsonValue?: {
      value?: {
        href: string;
      };
    };
  };
};
export type ProfileDetailProps = ComponentProps & {
  fields: {
    data: {
      item: {
        title?: { jsonValue: { value: string } };
        alternateTitle?: { jsonValue: { value: string } };
        professionalTitle?: {
          jsonValue?: {
            fields?: {
              Title?: TextField;
            };
          };
        };
        additionalOffices?: TextField;
        role?: TextField;
        phone1?: TextField;
        profileImage: {
          jsonValue: ImageField;
        };
        linkedIn?: {
          jsonValue?: {
            value?: {
              href?: string;
            };
          };
        };
        contactCTA?: {
          jsonValue?: {
            value?: {
              href?: string;
              text?: string;
            };
          };
        };
        email?: {
          value?: string;
        };
        offices?: {
          targetItems?: OfficeType[];
        };
        barAdmission?: {
          results?: {
            children?: {
              results?: {
                children?: {
                  results?: BarAdmissionType[];
                };
              };
            };
          };
        };
        sectors?: {
          targetItems?: SectorsType[];
        };
        services?: {
          targetItems?: ServicesType[];
        };
      };
      icons: {
        children: {
          results: Icon[];
        };
      };
    };
  };
};
export enum IconType {
  LinkedIn = 'LinkedIn',
  Download = 'Download',
  Person = 'Person',
  Email = 'Email',
  Phone = 'Phone',
}
export interface ContextFields {
  [key: string]: unknown;
  profileImage: {
    value: {
      asset: {
        files: Array<{ url: string; name: string }>;
      };
    };
  };
  Email: Field<string>;
  Phone1: Field<string>;
  title: Field<string>;
  alternateTitle: Field<string>;
  Offices: {
    fields: {
      Title: Field<string>;
    };
  }[];
  ProfessionalTitle: {
    name: string;
    displayName: string;
    fields: {
      Title: Field<string>;
    };
  };
}
