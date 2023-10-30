import { ComponentProps } from 'lib/component-props';
import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

export interface RelatedInsightItem {
  url: { path: string };
  Title: { jsonValue: { value: string } };
  SubTitle: { jsonValue: { value: string } };
  Image: { jsonValue: ImageField };
  pageType: {
    targetItem: {
      pageType: { value: string };
      icon: { jsonValue: { value: string } };
    };
  };
  PublishedDate: { jsonValue: { value: string } };
}

export interface FilterParams {
  services?: string[];
  sectors?: string[];
  jurisdictions?: string[];
  categoryFilter?: string;
  contextItem?: {
    template: {
      name: string;
    };
    CategoryType: {
      targetItem: {
        type: {
          jsonValue: {
            value: string;
          };
        };
      };
    };
    PageType: {
      targetItem: {
        type: {
          jsonValue: {
            value: string;
          };
        };
      };
    };
    Sectors: {
      targetItems: {
        title: {
          jsonValue: {
            value: string;
          };
        };
      }[];
    };
    Services: {
      targetItems: {
        title: {
          jsonValue: {
            value: string;
          };
        };
      }[];
    };
    Jurisdictions: {
      targetItems: {
        title: {
          jsonValue: {
            value: string;
          };
        };
      }[];
    };
  };
}

export type RelatedInsightsProps = ComponentProps & {
  fields: {
    data: {
      contextItem: FilterParams['contextItem'];
      CategoryType: {
        targetItem: {
          type: {
            jsonValue: {
              value: string;
            };
          };
        };
      };
      PageType: {
        targetItem: {
          type: {
            jsonValue: {
              value: string;
            };
          };
        };
      };
      searchCategoryType: {
        name: string;
        type: {
          value: string;
        };
      };
      datasource: {
        SeeMore: {
          jsonValue: {
            value: {
              text: string;
              anchor: string;
              linktype: string;
              class: string;
              title: string;
              target: string;
              querystring: string;
              id: string;
              href: string;
            };
          };
        };
        RelatedInsights: { targetItems: Array<RelatedInsightItem> };
      };
    };
  };
};

export interface Widgets {
  widgets: {
    total_item: number;
    content: Array<RelatedInsightsFilterItem>;
  }[];
}
export type RelatedInsightsFilterItem = {
  url: string;
  name: string;
  //SubTitle: { jsonValue: { value: string } };
  image_url: string;
  page_type: string;
  page_type_icon: string;
  published_date: string;
};
