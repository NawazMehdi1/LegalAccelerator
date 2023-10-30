import { useEffect } from 'react';
import { UseSearchQueryProps } from 'utils/search';
import { useSearchRouter } from './useSearchRouter';
import { useSearchQuery } from './useSearchQuery';

export const useSearch = <T>(options: UseSearchQueryProps) => {
  const { keyphrase, setKeyphrase, ...searchOptions } = useSearchQuery<T>(options);
  const { keyword, ...queryOptions } = useSearchRouter();

  useEffect(() => {
    setKeyphrase(keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return { keyphrase, ...queryOptions, ...searchOptions };
};
