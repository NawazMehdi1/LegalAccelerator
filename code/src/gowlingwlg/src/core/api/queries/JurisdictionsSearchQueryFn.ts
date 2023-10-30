interface Params {
  searchSource: string;
  country: string;
  language: string;
  rfkid: string;
  searchKeyword: string;
  filter: string;
  sectorListItems: string[];
  servicesListItems: string[];
  activeTopics: string[];
}

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

export interface Widgets {
  widgets: {
    facet: [
      {
        label: string;
        name: string;
        value: Array<JurisdictionItem>;
      }
    ];
  }[];
}
export interface JurisdictionItem {
  id: string;
  text: string;
}
const JurisdictionsSearchQueryFn = (
  url: string,
  {
    searchSource,
    searchKeyword,
    rfkid,
    activeTopics,
    filter,
    sectorListItems,
    servicesListItems,
    country,
    language,
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

  return fetch(url, {
    method: 'POST',
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
                    name: 'jurisdictions',
                  },
                ],
                sort: {
                  name: 'text',
                  order: 'asc',
                },
                max: 100,
              },
              ...(searchKeyword && {
                query: {
                  keyPhrase: searchKeyword,
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

export default JurisdictionsSearchQueryFn;
