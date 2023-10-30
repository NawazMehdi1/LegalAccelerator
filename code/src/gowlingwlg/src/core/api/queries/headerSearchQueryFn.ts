import { Widgets } from 'components/HeaderSearch';

interface Params {
  searchSource: string;
  country: string;
  language: string;
  searchKeyword: string;
}

const headerSearchQueryFn = (
  url: string,
  { searchSource, searchKeyword, country, language }: Params
): Promise<Widgets> => {
  return fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: 'rfkid_7',
            search: {
              content: {},
              suggestion: [
                {
                  max: 5,
                  name: 'name_suggester',
                },
              ],
              query: {
                keyphrase: searchKeyword,
              },
              limit: 20,
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
};

export default headerSearchQueryFn;
