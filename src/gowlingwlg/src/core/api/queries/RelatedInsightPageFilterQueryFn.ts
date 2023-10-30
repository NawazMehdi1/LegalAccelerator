import { Widgets } from '../../../core/molecules/RelatedInsights/RelatedInsights.types';

interface Params {
  searchSource: string;
  country: string;
  language: string;
  categoryFilter: string;
  FilterValue?: string;
}

const RelatedInsightPageFilterQueryFn = (
  url: string,
  { searchSource, country, language, categoryFilter, FilterValue }: Params
): Promise<Widgets> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: 'rfkid_7', // To be pulled from layout service
            search: {
              content: {},
              filter: {
                type: 'and',
                filters: [
                  {
                    name: 'type',
                    type: 'eq',
                    value: 'Insights',
                  },
                  {
                    name: categoryFilter,
                    type: 'eq',
                    value: FilterValue,
                  },
                ],
              },
              sort: {
                value: [
                  {
                    order: 'desc',
                    name: 'published_date',
                  },
                ],
              },
              limit: 15,
            },
            sources: [searchSource], // To be pulled from layout service
          },
        ],
      },
      context: {
        locale: {
          country: country.toLocaleLowerCase(),
          language: language,
        },
      },
    }),
  }).then((res: Response) => {
    return res.json();
  });

export default RelatedInsightPageFilterQueryFn;
