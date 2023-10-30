import { searchQueryBuilder } from 'utils/search';
import { FacetOption, SortOption } from 'utils/search/search.types';
import { FilterOption } from 'utils/search/FilterOption';

describe('searchQueryBuilder', () => {
  const searchCoreProps = {
    rfk_id: 'rfkid_12',
    searchSource: 'gowling_dev',
    country: 'gb',
    language: 'en',
    limit: 100,
    offset: 0,
  };

  it('Should build basic query', () => {
    const query = searchQueryBuilder(searchCoreProps);
    const expected = {
      context: {
        locale: {
          country: searchCoreProps.country,
          language: searchCoreProps.language,
        },
      },
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: searchCoreProps.rfk_id,
            search: {
              content: {},
              limit: searchCoreProps.limit,
              offset: searchCoreProps.offset,
            },
            sources: [searchCoreProps.searchSource],
          },
        ],
      },
    };

    expect(query).toEqual(expected);
  });

  it('Should build query with keyphrase', () => {
    const keyphrase = 'test';
    const query = searchQueryBuilder({ ...searchCoreProps, keyphrase });
    const expected = {
      context: {
        locale: {
          country: searchCoreProps.country,
          language: searchCoreProps.language,
        },
      },
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: searchCoreProps.rfk_id,
            search: {
              content: {},
              query: {
                keyphrase,
              },
              limit: searchCoreProps.limit,
              offset: searchCoreProps.offset,
            },
            sources: [searchCoreProps.searchSource],
          },
        ],
      },
    };

    expect(query).toEqual(expected);
  });

  it('Should build query with facet', () => {
    const facet: FacetOption = {
      types: [
        {
          name: 'jurisdictions',
          max: 100,
        },
      ],
      sort: {
        name: 'text',
        order: 'asc',
      },
    };
    const query = searchQueryBuilder({ ...searchCoreProps, facet });
    const expected = {
      context: {
        locale: {
          country: searchCoreProps.country,
          language: searchCoreProps.language,
        },
      },
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: searchCoreProps.rfk_id,
            search: {
              content: {},
              facet,
              limit: searchCoreProps.limit,
              offset: searchCoreProps.offset,
            },
            sources: [searchCoreProps.searchSource],
          },
        ],
      },
    };

    expect(query).toEqual(expected);
  });

  it('Should build query with sort', () => {
    const sort: SortOption[] = [
      {
        order: 'desc',
        name: 'published_date',
      },
      {
        order: 'asc',
        name: 'name',
      },
    ];
    const query = searchQueryBuilder({ ...searchCoreProps, sort });
    const expected = {
      context: {
        locale: {
          country: searchCoreProps.country,
          language: searchCoreProps.language,
        },
      },
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: searchCoreProps.rfk_id,
            search: {
              content: {},
              sort: {
                value: sort,
              },
              limit: searchCoreProps.limit,
              offset: searchCoreProps.offset,
            },
            sources: [searchCoreProps.searchSource],
          },
        ],
      },
    };

    expect(query).toEqual(expected);
  });

  it('Should build query with exact filter', () => {
    const filters: FilterOption = {
      name: 'page_type',
      type: 'eq',
      value: 'Client Work',
    };
    const query = searchQueryBuilder({ ...searchCoreProps, filters });
    const expected = {
      context: {
        locale: {
          country: searchCoreProps.country,
          language: searchCoreProps.language,
        },
      },
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: searchCoreProps.rfk_id,
            search: {
              content: {},
              filter: filters,
              limit: searchCoreProps.limit,
              offset: searchCoreProps.offset,
            },
            sources: [searchCoreProps.searchSource],
          },
        ],
      },
    };

    expect(query).toEqual(expected);
  });

  it('Should build query with multiple filters', () => {
    const filters: FilterOption[][] = [
      [
        {
          name: 'jurisdictions',
          type: 'eq',
          value: 'Global',
        },
        {
          name: 'jurisdictions',
          type: 'eq',
          value: 'Canada',
        },
      ],
      [
        {
          name: 'topics',
          type: 'eq',
          value: 'Ipsum',
        },
        {
          name: 'topics',
          type: 'eq',
          value: 'Law',
        },
      ],
    ];
    const query = searchQueryBuilder({ ...searchCoreProps, filters });
    const expected = {
      context: {
        locale: {
          country: searchCoreProps.country,
          language: searchCoreProps.language,
        },
      },
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: searchCoreProps.rfk_id,
            search: {
              content: {},
              filter: {
                type: 'and',
                filters: [
                  {
                    type: 'or',
                    filters: filters[0],
                  },
                  {
                    type: 'or',
                    filters: filters[1],
                  },
                ],
              },
              limit: searchCoreProps.limit,
              offset: searchCoreProps.offset,
            },
            sources: [searchCoreProps.searchSource],
          },
        ],
      },
    };

    expect(query).toEqual(expected);
  });
});
