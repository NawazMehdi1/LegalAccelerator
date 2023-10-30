import { Widgets } from 'components/BioAccordion/BioAccordion';

interface Params {
  searchProfileName: string;
  searchSource: string;
  country: string;
  language: string;
}
const AwardsSearchQueryFn = (
  url: string,
  { searchProfileName, searchSource, country, language }: Params
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
                    name: 'page_type',
                    type: 'eq',
                    value: 'Awards Recognition',
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

export default AwardsSearchQueryFn;
