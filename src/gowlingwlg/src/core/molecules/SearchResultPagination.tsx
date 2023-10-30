import * as Select from '@radix-ui/react-select';
import PaginationExpand from 'core/atoms/Icons/PaginationExpand';
import SelectItem from 'core/atoms/Pagination/SelectItem';
import { useCallback } from 'react';
import { useI18n } from 'next-localization';
import DownArrow from 'core/atoms/Icons/DownArrow';

type PaginationProps = {
  resultsLimit: number;
  pageNumber: number;
  totalResults: number;
  setPageNumber: (value: number) => void;
  setResultsLimit: (value: number) => void;
  resultsPerPage: { ResultCount: { jsonValue: { value: number } } }[];
};

const SearchResultsPagination = ({
  resultsLimit,
  totalResults,
  setResultsLimit,
  resultsPerPage,
  pageNumber,
  setPageNumber,
}: PaginationProps): JSX.Element => {
  const { t } = useI18n();
  const maxAmountPages = Math.ceil(totalResults / resultsLimit) || 1;
  const hasResultsPerPage = totalResults / resultsLimit > 1;

  const desktopPageNumbers = useCallback(() => {
    const items: { offset: number; name: number }[] = [];
    for (let i = 1; i <= maxAmountPages; i++) {
      items.push({ offset: i * resultsLimit, name: i });
    }
    return items;
  }, [maxAmountPages, resultsLimit]);

  const onClickNext = () => {
    if (pageNumber < desktopPageNumbers()?.length) {
      setPageNumber(pageNumber + 1);
    }
  };

  const onClickPrevious = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const onClickLast = () => {
    setPageNumber(desktopPageNumbers()?.length);
  };

  const onClickFirst = () => {
    setPageNumber(1);
  };

  return (
    <div>
      <div className="w-full py-[24px] md:border-b-[1px] border-black">
        <div className="flex content-center align-center justify-between items-center pb-[20px] md:pb-[0] border-black border-b-[1px] md:border-b-[0px]">
          <div>
            {hasResultsPerPage ? (
              <>
                <span className="body-text font-bold">{`${(pageNumber - 1) * resultsLimit + 1}-${
                  (pageNumber - 1) * resultsLimit + resultsLimit > totalResults
                    ? totalResults
                    : (pageNumber - 1) * resultsLimit + resultsLimit
                }`}</span>{' '}
                of{' '}
              </>
            ) : (
              <>
                <span className="body-text font-bold">{totalResults}</span> of{' '}
              </>
            )}

            <span className="body-text font-bold">{totalResults}</span>
          </div>
          <div className="hidden lg:flex">
            <div
              className="rotate-180 flex mr-[23px] cursor-pointer p-[4px] pr-[0px] hover:scale-[1.2] transition-all duration-100"
              onClick={onClickFirst}
            >
              <PaginationExpand />
              <PaginationExpand className="relative right-[3px]" />
            </div>
            <div
              className="rotate-180 flex cursor-pointer p-[4px] hover:scale-[1.2] transition-all duration-100"
              onClick={onClickPrevious}
            >
              <PaginationExpand />
            </div>

            <div className="ml-[23px] mr-[23px] flex gap-x-[10px]">
              {desktopPageNumbers()?.map((pageIndex, index) => {
                if (pageNumber > 5 && index < 1) {
                  return (
                    <span
                      key={pageIndex.name}
                      className={`first-number ${
                        index + 1 === pageNumber ? 'font-bold' : ''
                      } cursor-pointer select-none hover:font-bold`}
                      onClick={() => {
                        setPageNumber(index + 1);
                      }}
                    >
                      {pageIndex.name}
                    </span>
                  );
                } else if (pageNumber < 7 && index < 7) {
                  return (
                    <span
                      key={pageIndex.name}
                      className={`first-number-list ${
                        index + 1 === pageNumber ? 'font-bold' : ''
                      } cursor-pointer select-none hover:font-bold`}
                      onClick={() => {
                        setPageNumber(index + 1);
                      }}
                    >
                      {pageIndex.name}
                    </span>
                  );
                } else {
                  return null;
                }
              })}
              {pageNumber > 6 && desktopPageNumbers()?.length > 8 && (
                <span data-testid="start-elipsis">...</span>
              )}
              {desktopPageNumbers()?.map((pageIndex, index) => {
                if (
                  index - pageNumber < 3 &&
                  pageNumber - index < 5 &&
                  pageNumber > 6 &&
                  desktopPageNumbers()?.length - pageNumber > 4
                ) {
                  return (
                    <span
                      key={pageIndex.name}
                      className={`middle-number-list ${
                        index + 1 === pageNumber ? 'font-bold' : ''
                      } cursor-pointer select-none hover:font-bold`}
                      onClick={() => {
                        setPageNumber(index + 1);
                      }}
                    >
                      {pageIndex.name}
                    </span>
                  );
                } else {
                  return null;
                }
              })}
              {desktopPageNumbers()?.length > 8 &&
                desktopPageNumbers()?.length - pageNumber > 4 && (
                  <span data-testid="end-elipsis">...</span>
                )}
              {desktopPageNumbers()?.map((pageIndex, index) => {
                if (
                  desktopPageNumbers()?.length - index < 2 &&
                  desktopPageNumbers()?.length - pageNumber > 1 &&
                  desktopPageNumbers()?.length > 8
                ) {
                  return (
                    <span
                      key={pageIndex.name}
                      className={`last-number ${
                        index + 1 === pageNumber ? 'font-bold' : ''
                      } cursor-pointer select-none hover:font-bold`}
                      onClick={() => {
                        setPageNumber(index + 1);
                      }}
                    >
                      {pageIndex.name}
                    </span>
                  );
                } else if (
                  desktopPageNumbers()?.length - pageNumber < 5 &&
                  desktopPageNumbers()?.length - index < 8 &&
                  desktopPageNumbers()?.length > 6 &&
                  pageNumber > 6
                ) {
                  return (
                    <span
                      key={pageIndex.name}
                      className={`last-number-list ${
                        index + 1 === pageNumber ? 'font-bold' : ''
                      } cursor-pointer select-none hover:font-bold`}
                      onClick={() => {
                        setPageNumber(index + 1);
                      }}
                    >
                      {pageIndex.name}
                    </span>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div
              className="flex mr-[23px] cursor-pointer p-[4px] hover:scale-[1.1] transition-all duration-100"
              onClick={onClickNext}
            >
              <PaginationExpand />
            </div>
            <div
              className="flex cursor-pointer p-[4px] hover:scale-[1.1] transition-all duration-100"
              onClick={onClickLast}
            >
              <PaginationExpand />
              <PaginationExpand className="relative right-[3px]" />
            </div>
          </div>

          <div className="body-text font-bold lg:hidden">{t('ShowResults')}</div>
          <div className="flex items-center justify-center">
            <div className="body-text font-bold hidden lg:block mr-[26px]">{t('ShowResults')}</div>
            <Select.Root
              onValueChange={(value) => setResultsLimit(Number(value))}
              defaultValue={resultsLimit?.toString()}
              name="resultsLimit"
            >
              <Select.Trigger
                className="flex h-10 w-[105px] items-center justify-between border border-black ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-xxl text-black font-arial text-[15px] py-[11px] px-[25px] bg-white"
                aria-label="amount"
              >
                <Select.Value>{resultsLimit}</Select.Value>
                <Select.Icon className="SelectIcon">
                  <DownArrow fill="#39224E" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
                  <Select.Viewport className="SelectViewport">
                    <Select.Group>
                      {resultsPerPage?.map((result, index) => {
                        return (
                          <SelectItem
                            key={`pagination-result-${index}`}
                            value={result.ResultCount?.jsonValue?.value}
                          >
                            {result.ResultCount?.jsonValue?.value}
                          </SelectItem>
                        );
                      })}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
        <div className="flex flex-col lg:hidden">
          <div className="flex justify-between items-end">
            <div onClick={onClickPrevious} className="hover:cursor-pointer select-none ml-[6px]">
              {t('previous')}
            </div>
            <div className="flex flex-col justify-center items-center body-text font-bold ">
              <div className="font-bold flex justify-center items-center text-center pt-[18px]">
                {t('GoTo')}
              </div>
              <Select.Root
                onValueChange={(value) => setPageNumber(Number(value))}
                value={pageNumber?.toString()}
                name="paginationOffset"
              >
                <Select.Trigger
                  className="flex h-10 w-[105px] items-center justify-between border bg-white ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-xxl text-black font-arial text-[15px] py-[11px] px-[25px] border-black"
                  aria-label="amount"
                >
                  <Select.Value>{pageNumber}</Select.Value>
                  <Select.Icon className="SelectIcon">
                    <DownArrow fill="#39224E" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
                    <Select.Viewport className="SelectViewport">
                      <Select.Group>
                        {[...Array(Math.ceil(totalResults / resultsLimit))].map(
                          (_value, pageIndex) => {
                            return (
                              <SelectItem value={pageIndex + 1} key={`${pageIndex}-pageindex`}>
                                {pageIndex + 1}
                              </SelectItem>
                            );
                          }
                        )}
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div onClick={onClickNext} className="hover:cursor-pointer select-none">
              {t('next')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPagination;
