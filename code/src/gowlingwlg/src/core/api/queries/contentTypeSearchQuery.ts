export interface Widgets {
  widgets: {
    total_item: number;
    facet?: {
      value: {
        id: string;
        text: string;
      }[];
    }[];
  }[];
}

export interface Facet {
  image_url: string;
  published_date: string;
  name: string;
  id: string;
  page_type: string;
  url: string;
  page_type_icon: string;
}

interface Params {
  searchSource: string;
  country: string;
  language: string;
  searchKeyword: string;
}
const contentTypeSearchQuery = (
  url: string,
  { searchSource, country, language, searchKeyword }: Params
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
              facet: {
                types: [
                  {
                    name: 'type',
                  },
                ],
              },
              query: {
                keyPhrase: searchKeyword || ' ',
              },
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

export default contentTypeSearchQuery;
