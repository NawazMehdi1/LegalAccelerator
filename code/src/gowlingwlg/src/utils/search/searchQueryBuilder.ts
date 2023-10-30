import { SearchQueryOptions } from './search.types';
import { FilterOption } from './FilterOption';

export const generateFilterOptions = (filters: FilterOption | FilterOption[][]) => {
  if (Array.isArray(filters)) {
    return {
      type: 'and',
      filters: filters.map((filter, index) => ({
        type: index === 0 ? 'and' : 'or',
        filters: filter,
      })),
    };
  }

  return filters as FilterOption;
};

export const searchQueryBuilder = (options: SearchQueryOptions) => {
  const {
    filters,
    limit,
    offset,
    searchSource,
    country,
    language,
    rfk_id,
    sort,
    keyphrase,
    content,
    facet,
  } = options;

  return {
    widget: {
      items: [
        {
          entity: 'content',
          rfk_id,
          search: {
            content: content
              ? {
                  fields: content,
                }
              : {},
            ...(keyphrase?.length ? { query: { keyphrase } } : {}),
            ...(facet?.types.length ? { facet } : {}),
            limit,
            offset,
            ...(sort?.length ? { sort: { value: sort } } : {}),
            ...(filters ? { filter: generateFilterOptions(filters) } : {}),
          },
          sources: [searchSource],
        },
      ],
    },
    context: {
      locale: {
        country,
        language,
      },
    },
  };
};
