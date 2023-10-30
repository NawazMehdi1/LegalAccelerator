interface Params {
  country: string;
  language: string;
  searchPageType: string;
  searchServiceName: string;
  searchSource: string;
  serviceName: string;
}

const clientWorkSearchQuery = (
  url: string,
  { country, language, searchPageType, searchServiceName, searchSource, serviceName }: Params
): Promise<unknown> =>
  fetch(url, {
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
              filter: {
                type: 'and',
                filters: [
                  {
                    name: 'page_type',
                    type: 'eq',
                    value: searchPageType,
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
                    name: 'published_date',
                    order: 'desc',
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

export default clientWorkSearchQuery;
