import { useState } from 'react';
import { SortOption, SORT } from 'utils/search';

export const useSort = (initialSort: SortOption[] = []) => {
  const [sort, setSort] = useState<SortOption[]>(initialSort);

  const addSortBy = (name: string, order: SORT = SORT.DESC) => {
    setSort([...sort, { name, order }]);
  };

  const removeSortBy = (name: string) => {
    setSort(sort.filter((item) => item.name !== name));
  };

  const toggleSortBy = (name: string) => {
    setSort(
      sort.map((item) =>
        item.name === name
          ? { ...item, order: item.order === SORT.DESC ? SORT.ASC : SORT.DESC }
          : item
      )
    );
  };

  const sortBy = (name: string, order: SORT = SORT.DESC) => {
    setSort(sort.map((item) => (item.name === name ? { ...item, order } : item)));
  };

  return { sort, addSortBy, removeSortBy, toggleSortBy, sortBy };
};
