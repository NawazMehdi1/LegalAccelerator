import { searchQueryBuilder, type SearchQueryOptions, type SearchResponse } from 'utils/search';

export const getSearchResutls = <T>(
  url: string,
  options: SearchQueryOptions
): Promise<SearchResponse<T> | undefined> => {
  try {
    const query = searchQueryBuilder(options);
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(query),
    }).then((res: Response) => {
      return res.json();
    });
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
};
