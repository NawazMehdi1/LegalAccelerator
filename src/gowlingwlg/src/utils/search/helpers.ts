import { FILTER_TYPE } from './config';
import { FilterOption } from './search.types';

export const getFilterGroupIndex = (
  filters: FilterOption | FilterOption[][] | undefined,
  filter: FilterOption
) => {
  if (Array.isArray(filters)) {
    const groupIndex = filters?.findIndex((item) =>
      item.find((subItem) => subItem.name === filter.name)
    );
    return groupIndex;
  }
  return -1;
};

export const isFilterSelected = (
  filters: FilterOption | FilterOption[][] | undefined,
  filter: FilterOption
) => {
  if (Array.isArray(filters)) {
    return Boolean(filters?.find((item) => item.find((subItem) => subItem.value === filter.value)));
  }
  return false;
};

export const updateFiltersWithJurisdictions = (
  filters: FilterOption[][],
  jurisdictions: FilterOption[]
) => {
  if (jurisdictions) {
    const updatedFilters = filters.map((filterGroup) => {
      return filterGroup.map((filter) => {
        if (filter.name === 'jurisdictions') {
          const jurisdictionValue = filter.value;
          const matchingJurisdiction = jurisdictions.find((j) => j.value === jurisdictionValue);

          if (!matchingJurisdiction) {
            if (jurisdictions.find((item) => item.value === 'Global')) {
              return { name: 'jurisdictions', type: FILTER_TYPE.EQ, value: 'Global' };
            }
            return { name: 'jurisdictions', type: FILTER_TYPE.EQ, value: jurisdictions[0].value };
          }
        }
        return filter;
      });
    });

    return updatedFilters;
  }
  return filters;
};
