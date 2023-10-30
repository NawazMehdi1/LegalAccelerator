import { useI18n } from 'next-localization';
import dynamic from 'next/dynamic';
import { ChangeEvent, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useResize } from 'hooks/useResize';
import SearchIcon from 'core/atoms/Icons/SearchIcon';
import { useSearch } from 'hooks/useSearch';
import { FacetOption, FilterOption, SortOption } from 'utils/search';
import { FILTER_TYPE, SORT } from 'utils/search/config';
import { useSearchQuery } from 'hooks/useSearchQuery';
import { usePagination } from 'hooks/usePagination';
import {
  getFilterGroupIndex,
  isFilterSelected,
  updateFiltersWithJurisdictions,
} from 'utils/search/helpers';
import PaginationExpand from 'core/atoms/Icons/PaginationExpand';
import JurisdictionFilter from './JurisdictionFilter';
import Sorting from './Sorting';
import SearchResultsPagination from '../SearchResultPagination';
import NoItemsFound from '../NoItemsFound';
import { Content } from './ContentTypes';
import FiltersMobileOverlay from './FiltersMobileOverlay';
import { FacetValueItem } from 'utils/search/search.types';

type FilterAndListingProps = {
  widgetId?: string;
  category?: string;
  pageOpitons?: string[];
  facet: FacetOption;
  filters: FilterOption[][];
  sort: SortOption[];
  featuredFacet: string;
  sortKey: string;
};

const jurisdictionsFacet: FacetOption = {
  types: [
    {
      name: 'jurisdictions',
      max: 100,
    },
  ],
  sort: {
    name: 'text',
    order: SORT.ASC,
  },
};

const ResultMap = {
  News: dynamic(() => import('./SearchResultsNewsCard')),
};

type MobileFilters = { [k: string]: { name: string; items: string[] } };

const FilterAndListing = (props: FilterAndListingProps) => {
  const expandedSearchRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();
  const { isDesktop } = useResize();
  const [adjustedFilters, setAdjustedFilters] = useState<FilterOption[][]>();
  const [showExpandedSearch, setShowExpandedSearch] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>();
  const { limit, offset, pageNumber, setPageNumber } = usePagination({
    limit: props.pageOpitons?.[0] ? parseFloat(props.pageOpitons?.[0]) : 10,
  });

  const { jurisdictions } = useSearchQuery({
    rfk_id: props.widgetId as string,
    limit: 100,
    offset: 0,
    facet: jurisdictionsFacet,
    filters: [[props.filters[0][0]]],
  });

  const {
    sort,
    filters: appliedFilters,
    data: searchResults,
    keyphrase,
    selectedJurisdictions,
    resultsCount: searchResultsCount,
    sortBy,
    setLimit,
    setKeyword,
    toggleFilter,
    clearFilters,
    bulkUpdateFilters,
  } = useSearch<Content>({
    rfk_id: props.widgetId as string,
    limit,
    offset,
    facet: props.facet,
    filters: adjustedFilters,
    sort: props.sort,
    enabled: !!adjustedFilters,
    useRouter: true,
  });

  useEffect(() => {
    if (!adjustedFilters && jurisdictions) {
      const cleanFilters = updateFiltersWithJurisdictions(props.filters, jurisdictions);
      setAdjustedFilters(cleanFilters);
      bulkUpdateFilters(cleanFilters.flat());
    }
  }, [adjustedFilters, bulkUpdateFilters, clearFilters, jurisdictions, props.filters]);

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e?.target?.value);
  };

  const toggleDropdown = (el: React.FormEvent<HTMLElement> | undefined) => {
    const dropdown = el?.currentTarget?.nextElementSibling;

    if (dropdown) {
      if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        dropdown.classList.add('block');
      } else {
        dropdown.classList.remove('block');
        dropdown.classList.add('hidden');
      }

      const allDropdowns = document.querySelectorAll('.dropdown-wrapper');
      allDropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('block');
          otherDropdown.classList.add('hidden');
        }
      });
    }
  };

  const { content, facet } = searchResults?.widgets?.[0] || {};
  const ResultCard =
    props.category && ResultMap[props.category as keyof typeof ResultMap]
      ? ResultMap[props.category as keyof typeof ResultMap]
      : ResultMap.News;

  const filters = useMemo(() => {
    const filterGroups = (appliedFilters as FilterOption[][])
      ?.flat()
      .reduce((acc, _filter): MobileFilters => {
        if (acc[_filter.name]) {
          return {
            ...acc,
            [_filter.name]: {
              ...acc[_filter.name],
              items: [...acc[_filter.name].items, _filter.value],
            },
          };
        }

        return {
          ...acc,
          [_filter.name]: {
            name: _filter.name,
            items: [_filter.value],
          },
        };
      }, {} as MobileFilters);

    const facetGroups = facet?.reduce((acc, item) => {
      if (acc[item.name as keyof typeof acc]) {
        return {
          ...acc,
          [item.name]: {
            ...acc[item.name as keyof typeof acc],
            items: [...acc[item.name as keyof typeof acc].items, ...item.value],
          },
        };
      }
      return {
        ...acc,
        [item.name]: {
          name: item.label,
          items: item.value,
        },
      };
    }, {} as { [k: string]: { name: string; items: FacetValueItem[] } });

    return {
      filterGroups,
      facetGroups,
      sortDirection: sort[0].order,
      filter: props.category || '',
    };
  }, [appliedFilters, facet, props.category, sort]);

  const updateFilters = (formState: {
    appliedFilters: { [k: string]: string[] };
    sortDirection: SORT;
  }) => {
    const nextFilters = Object.keys(formState.appliedFilters)
      .map((k) =>
        formState.appliedFilters[k].map((item) => {
          return {
            name: k,
            type: FILTER_TYPE.EQ,
            value: item,
          };
        })
      )
      .flat();

    bulkUpdateFilters(nextFilters);
    sortBy(props.sortKey, formState.sortDirection || SORT.DESC);
  };

  return (
    <div className="lg:bg-lightGrey">
      <div className="grid grid-cols-12 gap-[0.231rem] md:gap-y-[2.188rem] gap-x-[0.313rem] md:gap-[1.563rem] md:gap-x-[3.75rem] max-w-[75rem] 2xl:max-w-[90rem] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto col-span-12 pt-[3.375rem] pb-[4.375rem]">
        <div className="col-span-12">
          <div className="row lg:flex lg:justify-between lg:border-b-[0.063rem] lg:border-black border-solid">
            {!isDesktop && (
              <div className={`flex relative items-center`}>
                <input
                  ref={expandedSearchRef}
                  autoFocus
                  placeholder={t('SearchBar')}
                  spellCheck={true}
                  className="bg-white lg:p-[1.375rem_6.813rem_1.875rem_4.625rem] py-[0.75rem] px-[1.25rem] pl-[2.438rem] w-full border border-solid border-aubergine rounded-xxl lg:border-none lg:rounded-none font-arial font-normal leading-normal lg:text-[1.5rem] lg:text-white !outline-none lg:bg-mainPurple"
                  value={inputValue}
                  onChange={handleOnInputChange}
                  onKeyDown={(event) => {
                    if (event?.key === 'Enter') {
                      setKeyword(inputValue);
                    }
                  }}
                />
                <div
                  className="absolute lg:left-[2.5rem] left-[0.813rem] cursor-pointer"
                  onClick={() => {
                    setKeyword(inputValue);
                  }}
                >
                  <SearchIcon
                    height={isDesktop ? 24 : 20}
                    width={isDesktop ? 24 : 20}
                    fill={isDesktop ? 'white' : 'black'}
                  />
                </div>
              </div>
            )}
            <div className="col-span-12 lg:col-span-9 mb-[10px] lg:mb-0">
              <div className="hidden lg:flex items-center justify-start gap-[3.375rem] pb-[1.313rem]">
                <div className="flex relative items-center">
                  <button
                    className={`w-[11.938rem] h-[3.125rem] text-left border border-solid placeholder-darkGray border-aubergine rounded-xxl py-[0.75rem] pr-[1.25rem] pl-[3.063rem] ${
                      showExpandedSearch && isDesktop ? 'bg-mainPurple text-white' : ''
                    }`}
                    value={showExpandedSearch ? '' : keyphrase}
                    onClickCapture={() => {
                      setShowExpandedSearch(true);
                    }}
                    onClick={() => showExpandedSearch && expandedSearchRef?.current?.focus()}
                  >
                    {t('SearchBar')}
                  </button>
                  <div className="absolute left-[0.813rem] cursor-pointer">
                    <SearchIcon fill={showExpandedSearch && isDesktop ? 'white' : ''} />
                  </div>
                </div>
                {facet?.map((item, index: number) => {
                  return (
                    <Fragment key={index}>
                      <div className="relative" key={index}>
                        <button
                          key={item.name}
                          onClick={toggleDropdown}
                          className={`${
                            getFilterGroupIndex(appliedFilters, {
                              name: item.name,
                            } as FilterOption) !== -1
                              ? 'font-bold leading-normal mb-[-2px]'
                              : 'flex items-center leading-[156%]'
                          } `}
                        >
                          {item?.label.toLowerCase() === 'type' ? 'Content Type' : item?.label}
                          <PaginationExpand className={`rotate-[90deg] inline ml-[10px]`} />
                        </button>

                        <div className="px-[10px] pt-[20px] pb-[10px] w-[290px] dropdown-wrapper hidden top-[30px] lg:top-[59px] lg:left-[-113%] min-w-max absolute z-[10] bg-mainPurple text-white">
                          <ul>
                            {item?.value?.map((input, index) => {
                              return (
                                <>
                                  {input?.text && (
                                    <li
                                      className="pl-[12px] pb-[8px] pt-[8px] hover:bg-extraLightGrey hover:text-black max-w-[250px]"
                                      key={`${index}${input}`}
                                    >
                                      <label className="space-x-1 flex">
                                        <input
                                          type="checkbox"
                                          className="form-checkbox text-gray-600"
                                          checked={isFilterSelected(appliedFilters, {
                                            name: item.name,
                                            type: FILTER_TYPE.EQ,
                                            value: input?.text,
                                          })}
                                          onChange={() =>
                                            toggleFilter({
                                              name: item.name,
                                              type: FILTER_TYPE.EQ,
                                              value: input?.text,
                                            })
                                          }
                                        />
                                        <span>{input?.text} </span>
                                      </label>
                                    </li>
                                  )}
                                </>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-3 mb-[10px] lg:mb-0">
              <JurisdictionFilter
                selectedJurisdictions={selectedJurisdictions}
                jurisdictions={jurisdictions}
                toggleFilter={(option: FilterOption) => {
                  toggleFilter({
                    name: 'jurisdictions',
                    type: FILTER_TYPE.EQ,
                    value: option.value,
                  });
                }}
              />
            </div>
            <FiltersMobileOverlay updateFilters={updateFilters} {...filters} />
          </div>

          {showExpandedSearch && (
            <div className={`hidden lg:flex relative items-center`}>
              <input
                ref={expandedSearchRef}
                autoFocus
                placeholder={t('SearchBar')}
                spellCheck={true}
                className="bg-white lg:p-[1.375rem_6.813rem_1.875rem_4.625rem] py-[0.75rem] px-[1.25rem] pl-[2.438rem] w-full border border-solid border-aubergine rounded-xxl lg:border-none lg:rounded-none font-arial font-normal leading-normal lg:text-[1.5rem] lg:text-white !outline-none lg:bg-mainPurple"
                value={inputValue}
                onChange={handleOnInputChange}
                onKeyDown={(event) => {
                  if (event?.key === 'Enter') {
                    setKeyword(inputValue);
                  }
                }}
              />
              <div
                className="absolute lg:left-[2.5rem] left-[0.813rem] cursor-pointer"
                onClick={() => {
                  setKeyword(inputValue);
                }}
              >
                <SearchIcon
                  height={isDesktop ? 24 : 20}
                  width={isDesktop ? 24 : 20}
                  fill={isDesktop ? 'white' : 'black'}
                />
              </div>
            </div>
          )}

          <div className="hidden relative lg:flex justify-between pt-[14px]">
            <p className="flex items-center gap-[1.375rem] leading-[1.56rem] font-normal md:font-bold text-[1rem] font-arial tracking-[-0.06rem]">
              <span className="text-[1rem] font-bold md:font-normal">
                {keyphrase &&
                  t('ShowingResults', {
                    count: searchResultsCount,
                    keyword: keyphrase ? ' "' + keyphrase + '"' : '',
                  })}
              </span>
            </p>
            <div className="lg:flex flex-col items-end gap-[0.688rem] lg:gap-[3rem]">
              <Sorting
                sortDirection={sort?.find((item) => item.name === props.sortKey)?.order}
                setSortDirection={sortBy}
                heading={t('SortByDate')}
                name={props.sortKey}
                clearFilters={clearFilters}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12">
          {content?.length ? (
            <>
              <ResultCard items={content} />
              <SearchResultsPagination
                resultsLimit={limit as number}
                pageNumber={pageNumber}
                totalResults={searchResultsCount || 0}
                setPageNumber={setPageNumber}
                setResultsLimit={setLimit}
                resultsPerPage={
                  props.pageOpitons?.map((value) => ({
                    ResultCount: { jsonValue: { value: parseFloat(value) } },
                  })) || []
                }
              />
            </>
          ) : (
            <NoItemsFound keyword={keyphrase ? '"' + keyphrase + '"' : ''} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterAndListing;
