import { Widgets } from 'components/Latestinsights/LatestInsights';

interface Params {
  searchCategoryType: string;
  searchProfileName: string;
  searchSource: string;
  country: string;
  language: string;
}
const latestInsightsSearchQueryFn = (
  url: string,
  { searchCategoryType, searchProfileName, searchSource, country, language }: Params
): Promise<Widgets> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: 'rfkid_7',
            search: {
              content: {},
              filter: {
                type: 'and',
                filters: [
                  {
                    name: 'type',
                    type: 'eq',
                    value: searchCategoryType,
                  },
                  {
                    name: 'authors',
                    type: 'eq',
                    value: searchProfileName,
                  },
                ],
              },
              sort: {
                value: [
                  {
                    order: 'desc',
                    name: 'published_date',
                  },
                  {
                    order: 'asc',
                    name: 'name',
                  },
                ],
              },
              limit: 3,
            },
            sources: [searchSource],
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

export default latestInsightsSearchQueryFn;
