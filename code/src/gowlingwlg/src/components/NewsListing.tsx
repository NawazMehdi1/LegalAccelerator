import FilterAndListing from 'core/molecules/FilterAndListing';
import { useJurisdiction } from 'hooks/useJurisdiction';
import { ComponentProps } from 'lib/component-props';
import { useMemo } from 'react';
import { FacetOption, SORT } from 'utils/search';
import { FILTER_TYPE } from 'utils/search/config';

type InsightsListingPrpos = ComponentProps & {
  fields?: {
    data?: {
      datasource?: {
        ResultsPerPage?: {
          targetItems?: {
            ResultCount?: {
              jsonValue?: {
                value?: string;
              };
            };
          }[];
        };
      };
      searchWidgetId?: {
        name?: string;
        widgetId?: {
          value?: string;
        };
      };
      newsCategoryType?: {
        name?: string;
        type?: {
          value?: string;
        };
      };
    };
  };
};

const facet: FacetOption = {
  types: [
    {
      name: 'type',
      max: 100,
    },
    {
      name: 'sectors',
      max: 100,
    },
    {
      name: 'services',
      max: 100,
    },
  ],
  sort: {
    name: 'text',
    order: SORT.ASC,
  },
};

const sort = [
  {
    name: 'published_date',
    order: SORT.DESC,
  },
];

const InsightsListing = (props: InsightsListingPrpos) => {
  const { jurisdiction } = useJurisdiction();
  const category = props?.fields?.data?.newsCategoryType?.type?.value;
  const widgetId = props?.fields?.data?.searchWidgetId?.widgetId?.value;
  const pageOpitons = props?.fields?.data?.datasource?.ResultsPerPage?.targetItems?.reduce(
    (acc, item) =>
      item.ResultCount?.jsonValue?.value ? [...acc, item.ResultCount?.jsonValue?.value] : acc,
    []
  );

  const filters = useMemo(
    () => [
      [
        {
          name: 'type',
          type: FILTER_TYPE.EQ,
          value: category as string,
        },
        {
          name: 'jurisdictions',
          type: FILTER_TYPE.EQ,
          value: jurisdiction as string,
        },
      ],
    ],
    [category, jurisdiction]
  );

  if (jurisdiction) {
    return (
      <FilterAndListing
        widgetId={widgetId}
        category={category}
        pageOpitons={pageOpitons}
        facet={facet}
        filters={filters}
        featuredFacet="type"
        sort={sort}
        sortKey="published_date"
      />
    );
  }

  return <></>;
};

export default InsightsListing;
