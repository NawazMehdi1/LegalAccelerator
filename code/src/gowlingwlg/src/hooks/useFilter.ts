import { useState } from 'react';
import { FilterOption } from 'utils/search';
import { getFilterGroupIndex, isFilterSelected } from 'utils/search/helpers';

export const useFilter = (initialFilters?: FilterOption | FilterOption[][]) => {
  const [filters, setFilters] = useState(initialFilters);

  const addFilter = (filter: FilterOption) => {
    if (Array.isArray(filters)) {
      const groupIndex = getFilterGroupIndex(filters, filter);

      if (groupIndex >= 0) {
        setFilters(
          filters.reduce<FilterOption[][]>(
            (acc, group, index) =>
              index === groupIndex ? [...acc, [...group, filter]] : [...acc, [...group]],
            []
          )
        );
      } else {
        setFilters([...filters, [filter]]);
      }
    }
  };

  const removeFilter = (filter: FilterOption) => {
    if (Array.isArray(filters)) {
      const groupIndex = getFilterGroupIndex(filters, filter);

      if (groupIndex >= 0) {
        setFilters(
          filters.reduce<FilterOption[][]>((acc, item, index) => {
            if (index === groupIndex) {
              return item.length > 1
                ? [...acc, item.filter((subitem) => subitem.value !== filter.value)]
                : acc;
            }
            return [...acc, item];
          }, [])
        );
      }
    }
  };

  const bulkUpdateFilters = (applyingFilters: FilterOption[]) => {
    if (Array.isArray(filters) || filters === undefined) {
      if (applyingFilters.length) {
        const updatedFilters = applyingFilters.reduce(
          (acc, applyingFilter) => {
            const index = acc.findIndex((filterGroup) =>
              filterGroup.some((filter) => filter.name === applyingFilter.name)
            );

            if (index !== -1) {
              return acc.map((filterGroup, groupIndex) => {
                if (groupIndex === index) {
                  return [...filterGroup, applyingFilter];
                }
                return filterGroup;
              });
            } else {
              return [...acc, [applyingFilter]];
            }
          },
          [...(filters || [])]
        );

        setFilters(updatedFilters);
      } else {
        setFilters(initialFilters);
      }
    }
  };

  const toggleFilter = (filter: FilterOption) => {
    if (Array.isArray(filters)) {
      const isAlreadySelected = isFilterSelected(filters, filter);

      if (isAlreadySelected) {
        removeFilter(filter);
      } else {
        addFilter(filter);
      }
    }
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    setFilters,
    addFilter,
    removeFilter,
    toggleFilter,
    clearFilters,
    bulkUpdateFilters,
  };
};
