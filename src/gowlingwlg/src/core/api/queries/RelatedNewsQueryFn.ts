import { Widgets } from '../../../components/RelatedNews/RelatedNews';

interface Params {
  searchSource: string;
  country: string;
  language: string;
  searchServiceName: string;
  serviceName: string;
  searchCategoryType: string;
}
const RelatedNewsQueryFn = (
  url: string,
  { searchSource, country, language, serviceName, searchServiceName, searchCategoryType }: Params
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
              query: {
                keyPhrase: ' ',
              },
              filter: {
                type: 'and',
                filters: [
                  {
                    name: 'type',
                    type: 'eq',
                    value: searchCategoryType,
                  },
                  {
                    name: serviceName,
                    type: 'eq',
                    value: searchServiceName,
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

export default RelatedNewsQueryFn;
