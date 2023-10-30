import { useRouter } from 'next/router';

type SearchQueryProps = {
  keyword?: string;
  page?: string;
};

export const useSearchRouter = () => {
  const router = useRouter();
  const { keyword, page: pageNumber = '1' } = (router?.query as SearchQueryProps) || {};

  const addToRoute = (item: string, value?: string) => {
    router.push(
      {
        ...router,
        query: {
          ...router.query,
          [item]: value?.length ? value : ' ',
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const setKeyword = (keyword?: string) => {
    addToRoute('keyword', keyword);
  };

  const setPageNumber = (page: number) => {
    addToRoute('page', page.toString());
  };

  return {
    keyword,
    pageNumber: parseFloat(pageNumber),
    setKeyword,
    setPageNumber,
  };
};
