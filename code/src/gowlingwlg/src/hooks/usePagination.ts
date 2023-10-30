import { useMemo, useState } from 'react';
import { useSearchRouter } from './useSearchRouter';

type PaginationOptionsType = {
  limit: number;
  offset?: number;
  useRouter?: boolean;
};

const getOffset = (pageNumber: number, limit: number) => (pageNumber - 1) * limit;

export const usePagination = (options: PaginationOptionsType) => {
  const { pageNumber, setPageNumber } = useSearchRouter();
  const [limit, setLimit] = useState<number>(options.limit);

  const offset = useMemo(
    () => (options.useRouter ? getOffset(pageNumber, options.limit) : options.offset || 0),
    [options.limit, options.offset, options.useRouter, pageNumber]
  );

  const _setPageNumber = (_pageNumber: number) => {
    setPageNumber(_pageNumber);
  };

  return {
    pageNumber,
    limit,
    offset,
    setLimit,
    setPageNumber: _setPageNumber,
  };
};
