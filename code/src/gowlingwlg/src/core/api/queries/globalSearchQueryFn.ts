import { Widgets } from 'components/GlobalSearch';

interface FilterCore {
  type: string;
}

interface ExactFilter extends FilterCore {
  name: string;
  value: string;
}

interface QueryFilter extends FilterCore {
  filters: ExactFilter[];
}

interface Params {
  searchSource: string;
  country: string;
  language: string;
  rfkid: string;
  searchKeyword: string;
  filter: string;
  sortDirection?: string;
  sectorListItems: string[];
  servicesListItems: string[];
  sortDirectionType: 'published_date' | 'name';
  activeTopics: string[];
  jurisdictions: string[];
  resultsLimit: number;
  paginationOffset: number | undefined;
}
const globalSearchQueryFn = (
  url: string,
  {
    searchSource,
    searchKeyword,
    rfkid,
    sortDirection,
    sortDirectionType,
    activeTopics,
    filter,
    sectorListItems,
    servicesListItems,
    country,
    language,
    jurisdictions,
    resultsLimit,
    paginationOffset,
  }: Params
): Promise<Widgets> => {
  const filters: (ExactFilter | QueryFilter)[] = [];

  if (filter != '') {
    filters.push({
      name: 'type',
      type: 'eq',
      value: filter,
    });
  }

  if (activeTopics.length) {
    filters.push({
      type: 'or',
      filters: activeTopics.map((topic) => ({
        name: 'topics',
        type: 'eq',
        value: topic,
      })),
    });
  }

  if (sectorListItems.length) {
    filters.push({
      type: 'or',
      filters: sectorListItems.map((sector) => ({
        name: 'sectors',
        type: 'eq',
        value: sector,
      })),
    });
  }

  if (servicesListItems.length) {
    filters.push({
      type: 'or',
      filters: servicesListItems.map((service) => ({
        name: 'services',
        type: 'eq',
        value: service,
      })),
    });
  }
  if (jurisdictions.length) {
    filters.push({
      type: 'or',
      filters: jurisdictions.map((jurisdiction) => ({
        name: 'jurisdictions',
        type: 'eq',
        value: jurisdiction,
      })),
    });
  }

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
            rfk_id: rfkid,
            search: {
              facet: {
                types: [
                  {
                    name: 'type',
                  },
                  {
                    name: 'sectors',
                    max: 100,
                    sort: {
                      name: 'text',
                      order: 'asc',
                    },
                  },
                  {
                    name: 'services',
                    max: 100,
                    sort: {
                      name: 'text',
                      order: 'asc',
                    },
                  },
                  {
                    name: 'topics',
                    max: 100,
                    sort: {
                      name: 'text',
                      order: 'asc',
                    },
                  },
                ],
              },
              content: {},
              limit: resultsLimit,
              offset: paginationOffset,
              ...(searchKeyword && {
                query: {
                  keyphrase: searchKeyword,
                },
              }),
              ...(sortDirection && {
                sort: {
                  value: [
                    {
                      order: sortDirection,
                      name: sortDirectionType,
                    },
                    {
                      order: 'asc',
                      name: 'name',
                    },
                  ],
                },
              }),
              ...(filters.length > 0 && {
                filter: {
                  type: 'and',
                  filters,
                },
              }),
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

export default globalSearchQueryFn;
