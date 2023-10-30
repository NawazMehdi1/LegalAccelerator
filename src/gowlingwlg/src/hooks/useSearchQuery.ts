import { useMemo, useState } from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useQuery } from '@tanstack/react-query';
import { getSearchResutls } from 'data/searchQuery';
import useLanguageHook from 'core/hooks/useLanguageHook';
import { FilterOption, UseSearchQueryProps } from 'utils/search';
import { useSort } from './useSort';
import { useFacet } from './useFacet';
import { useFilter } from './useFilter';
import { useContent } from './useContent';
import { usePagination } from './usePagination';

export const useSearchQuery = <T>(options: UseSearchQueryProps) => {
  const [keyphrase, setKeyphrase] = useState(options?.keyphrase);
  const { limit, offset, setLimit } = usePagination(options);
  const { sort, addSortBy, removeSortBy, sortBy, toggleSortBy } = useSort(options?.sort);
  const { content, addContent, removeContent } = useContent(options?.content);
  const { facet, addFacet, removeFacet, addFacetType, removeFacetType } = useFacet(options?.facet);
  const {
    filters,
    setFilters,
    addFilter,
    removeFilter,
    toggleFilter,
    clearFilters,
    bulkUpdateFilters,
  } = useFilter(options?.filters);
  const { language, country } = useLanguageHook();
  const { sitecoreContext } = useSitecoreContext();
  const searchApiUrl = sitecoreContext?.SearchApiUrl as string;
  const searchSource = sitecoreContext?.SearchSource as string;

  const queryOptions = useMemo(
    () => ({
      searchSource,
      language,
      country,
      sort,
      filters,
      facet,
      content,
      limit,
      rfk_id: options.rfk_id,
      offset,
      keyphrase,
    }),
    [
      content,
      country,
      facet,
      filters,
      keyphrase,
      language,
      limit,
      offset,
      options.rfk_id,
      searchSource,
      sort,
    ]
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', queryOptions],
    queryFn: () => getSearchResutls<T>(searchApiUrl, queryOptions),
    refetchOnWindowFocus: false,
    enabled: options.enabled !== undefined ? options.enabled : true,
  });

  const resultsCount = data?.widgets?.[0]?.total_item;
  const selectedJurisdictions = useMemo(
    () =>
      (filters as FilterOption[][])?.reduce((acc, item) => {
        const jurisdictions: FilterOption[] = [];

        item.forEach((subitem) => {
          if (subitem.name === 'jurisdictions') {
            jurisdictions.push(subitem);
          }
        });
        return [...acc, ...jurisdictions];
      }, []),
    [filters]
  );

  const jurisdictions = useMemo(
    () =>
      data?.widgets?.[0]?.facet?.[0]?.value?.map(
        (item) =>
          ({
            id: item.id,
            value: item.text,
          } as unknown as FilterOption)
      ),
    [data?.widgets]
  );

  return {
    sort,
    data,
    error,
    filters,
    keyphrase,
    isLoading,
    resultsCount,
    jurisdictions,
    selectedJurisdictions,
    sortBy,
    setLimit,
    addFacet,
    addFilter,
    addSortBy,
    setFilters,
    addContent,
    removeFacet,
    addFacetType,
    toggleSortBy,
    removeFilter,
    setKeyphrase,
    removeSortBy,
    clearFilters,
    removeContent,
    toggleFilter,
    removeFacetType,
    bulkUpdateFilters,
  };
};
