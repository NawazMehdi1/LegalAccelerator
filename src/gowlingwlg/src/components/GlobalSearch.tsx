/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
import { useI18n } from 'next-localization';
import SerchResultsPersonCard from 'core/organisms/SerchResultsPersonCard';
import { SearchResultCard } from 'lib/component-props';
import { useQuery } from '@tanstack/react-query';
import globalSearchQueryFn from 'core/api/queries/globalSearchQueryFn';
import useLanguageHook from 'core/hooks/useLanguageHook';
import FiltersMobileOverlay from 'core/organisms/FiltersMobileOverlay';
import Sorting from 'core/molecules/Sorting';
import TopicsSorting from 'core/molecules/TopicsSorting';
import SearchIcon from 'core/atoms/Icons/SearchIcon';
import SectorFilterList from '../core/atoms/SearchFilters/SectorFilter';
import ServicesFilterList from '../core/atoms/SearchFilters/ServiceFilter';
import SearchResultsPagination from '../core/molecules/SearchResultPagination';
import NoItemsFound from 'core/molecules/NoItemsFound';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'core/atoms/ui/select';
import JurisdictionFilter from 'core/organisms/JurisdictionFilter/JurisdictionFilter';
import JurisdictionsSearchQueryFn, {
  JurisdictionItem,
} from 'core/api/queries/JurisdictionsSearchQueryFn';

export interface Widgets {
  widgets: {
    total_item: number;
    content: Array<SearchResultCard>;
    facet?: {
      name: string;
      value: {
        id: string;
        text: string;
        count?: number;
      }[];
    }[];
  }[];
}
interface pageTypes {
  text: string;
}

type Topic = {
  id: string;
  count?: number;
  text: string;
};

type SearchPageProps = {
  fields: {
    data: {
      datasource: {
        ResultsPerPage: { targetItems: { ResultCount: { jsonValue: { value: number } } }[] };
      };
      searchWidgetId: {
        widgetId: {
          value: string;
        };
      };
    };
  };
};

const getCountry = async () => {
  try {
    const response = await fetch('/api/edge-geo', {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch {
    console.error('Failed to detect Country');
  }
};

const GlobalSearch = (props: SearchPageProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { country, language } = useLanguageHook();
  const { sitecoreContext } = useSitecoreContext();
  const [searchResults, setSearchResults] = useState<SearchResultCard[]>([]);
  const [pageTypes, setPageTypes] = useState<pageTypes[]>([]);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [showExpandedSearch, setShowExpandedSearch] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>(router.query.keyword as string);
  const [shouldFetchSearchItems, setShouldFetchSearchItems] = useState<boolean>(true);
  const [jurisdictionsFilters, setJurisdictionsFilters] = useState<JurisdictionItem[]>([]);
  const [defaultJurisdiction, setDefaultJurisdiction] = useState<string>('');
  const [selectedJurisdictionFilters, setSelectedJurisdictionFilters] = useState<string[]>([]);
  const [sortDirection, setSortDirection] = useState('');
  const [sortDirectionType, setSortDirectionType] = useState<'published_date' | 'name'>(
    'published_date'
  );
  const [showResultsForValue, setShowResultsForValue] = useState<string>(' ');
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  const [topicsList, setTopicsList] = useState<Topic[]>([]);
  const [servicesList, setServicesList] = useState<Topic[]>([]);
  const [sectorList, setSectorList] = useState<Topic[]>([]);
  const [filter, setFilter] = useState('');
  const { t } = useI18n();
  const [sectorListItems, setSectorListItems] = useState([]);
  const [servicesListItems, setServicesListItems] = useState([]);
  const [pageloaded, setPageLoaded] = useState(false);

  const [resultsLimit, setResultsLimit] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const searchApiUrl = sitecoreContext?.SearchApiUrl as string;
  const searchSource = sitecoreContext?.SearchSource as string;

  const selectedJurisdictionFiltersValues = jurisdictionsFilters
    ?.filter((filter) => selectedJurisdictionFilters.includes(filter.id))
    .map((filter) => filter.text);

  const { data: search, refetch: refetchResults } = useQuery({
    queryKey: ['search'],
    queryFn: () =>
      globalSearchQueryFn(searchApiUrl, {
        searchSource,
        searchKeyword: searchKeyword,
        rfkid: props.fields?.data?.searchWidgetId?.widgetId?.value,
        sortDirection,
        sortDirectionType,
        activeTopics,
        filter,
        sectorListItems,
        servicesListItems,
        country,
        language,
        jurisdictions: selectedJurisdictionFiltersValues,
        resultsLimit,
        paginationOffset: (pageNumber - 1) * resultsLimit,
      }),
    enabled: false,
    staleTime: 120000,
    cacheTime: 120000,
  });

  const { data: jurisdictionData, refetch: refetchJurisdictions } = useQuery({
    queryKey: ['jurisdictions'],
    queryFn: () =>
      JurisdictionsSearchQueryFn(searchApiUrl, {
        searchSource,
        searchKeyword: searchKeyword,
        rfkid: props.fields?.data?.searchWidgetId?.widgetId?.value,
        activeTopics,
        filter,
        sectorListItems,
        servicesListItems,
        country,
        language,
      }),
    enabled: false,
    staleTime: 120000,
    cacheTime: 120000,
  });

  useEffect(() => {
    if (search?.widgets?.[0]?.content) {
      setSearchResults(search?.widgets?.[0].content);
    } else {
      setSearchResults([]);
    }

    if (search?.widgets?.[0]?.facet) {
      setPageTypes(
        search?.widgets?.[0]?.facet.filter((item) => item.name === 'type')[0]?.value || []
      );
      setTopicsList(
        search?.widgets?.[0]?.facet.filter((item) => item.name === 'topics')[0]?.value || []
      );
      setServicesList(
        search?.widgets?.[0]?.facet.filter((item) => item.name === 'services')[0]?.value || []
      );
      setSectorList(
        search?.widgets?.[0]?.facet.filter((item) => item.name === 'sectors')[0]?.value || []
      );
    } else {
      setPageTypes([]);
      setTopicsList([]);
      setServicesList([]);
      setSectorList([]);
    }
  }, [search?.widgets]);

  const shadowReroute = useCallback(
    (keyword: string | number, key: string) => {
      const queries: { [key: string]: string } = {};
      for (const [key, value] of searchParams.entries()) {
        if (key !== 'path') {
          queries[key] = value;
        }
      }
      if (keyword) {
        queries[key] = keyword.toString();
      }
      router.push(
        {
          pathname: pathname,
          query: { ...queries },
        },
        undefined,
        { shallow: true }
      );
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    if (searchKeyword) {
      shadowReroute(searchKeyword, 'keyword');
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (pageNumber) {
      shadowReroute(pageNumber, 'pageNumber');
    }
  }, [pageNumber]);

  useEffect(() => {
    if (router.isReady) {
      if (router?.query?.keyword) {
        setSearchKeyword(router.query.keyword as string);
        setSearchInputValue(router.query.keyword as string);
        setShowExpandedSearch(router.query.keyword ? true : false);
        setShowResultsForValue(router.query.keyword as string);
      } else setSearchKeyword('');

      if (router?.query?.pageNumber) {
        setPageNumber(Number(router?.query?.pageNumber));
      } else setPageNumber(1);
    }
  }, [router?.query]);

  useEffect(() => {
    if (jurisdictionData?.widgets?.[0]?.facet?.[0]?.value && defaultJurisdiction) {
      let jurisdictions = [...jurisdictionData.widgets[0].facet[0].value];
      if (jurisdictions.find((filter) => filter.text.toLowerCase() == 'global')) {
        jurisdictions = jurisdictions.filter((filter) => filter.text.toLowerCase() !== 'global');
        jurisdictions = [{ text: 'Global', id: 'global_jurisdiction_id' }, ...jurisdictions];
      }
      setJurisdictionsFilters(jurisdictions);
      if (!pageloaded) {
        const defaultJurisdictionItem = jurisdictions.filter(
          (item) => item.text == defaultJurisdiction
        )[0]?.id;
        setSelectedJurisdictionFilters([defaultJurisdictionItem]);
        setPageLoaded(true);
      }
    } else setJurisdictionsFilters([]);
  }, [jurisdictionData, defaultJurisdiction]);

  const expandedSearchRef = useRef<HTMLInputElement>(null);

  useMemo(() => {
    getCountry().then((data) => {
      setDefaultJurisdiction(t([data?.country]) || 'Global');
      console.log('geolocation country: ', data?.country || 'Global'); // for testing on DEV
      console.log('geolocation region: ', data?.region || 'Global'); // for testing on DEV
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth > 991;
      setIsDesktop(isDesktop);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (shouldFetchSearchItems) {
      setShouldFetchSearchItems(false);
    }
  }, [shouldFetchSearchItems]);

  useEffect(() => {
    setPageNumber(1);
  }, [filter, sectorListItems, servicesListItems, resultsLimit, activeTopics]);

  useEffect(() => {
    if (router.isReady) {
      refetchJurisdictions();
    }
  }, [filter, activeTopics, sectorListItems, servicesListItems, searchKeyword]);

  useEffect(() => {
    if (jurisdictionData && defaultJurisdiction && router.isReady && pageloaded) {
      refetchResults();
    }
  }, [
    defaultJurisdiction,
    selectedJurisdictionFilters,
    filter,
    activeTopics,
    sectorListItems,
    servicesListItems,
    searchKeyword,
    sortDirection,
    pageNumber,
    resultsLimit,
    pageloaded,
  ]);

  const filters = {
    sortDirectionType,
    activeTopics,
    servicesListItems,
    sectorListItems,
    filter,
    searchKeyword,
    sortDirection,
    topicsList,
    servicesList,
    sectorList,
  };

  const updateFilters = (formState: {
    sortDirection: string;
    activeTopics: string[];
    servicesListItems: [];
    sectorListItems: [];
  }) => {
    setSortDirection(formState.sortDirection);
    setActiveTopics(formState.activeTopics);
    setSectorListItems(formState.sectorListItems);
    setServicesListItems(formState.servicesListItems);
  };

  const clearFilters = () => {
    setSortDirection('');
    setActiveTopics([]);
    setSectorListItems([]);
    setServicesListItems([]);
  };

  return (
    <div className="grid grid-cols-12 gap-[0.231rem] md:gap-y-[2.188rem] gap-x-[0.313rem] md:gap-[1.563rem] md:gap-x-[3.75rem] max-w-[75rem] 2xl:max-w-[90rem] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12 pb-[4.375rem]">
      <h1
        className={`flex ${
          !searchResults?.length ? 'items-center' : 'items-end'
        } gap-[1.12rem] md:leading-8 font-normal md:font-bold col-span-8 text-[1rem] md:text-[3rem] font-arial md:font-gowlingBliss tracking-[-0.06rem] md:pb-[4.125rem] pt-[1.37rem] md:pt-[3.69rem] text-aubergine`}
      >
        <div className="w-[min-content] whitespace-nowrap">{t('SearchResults')}</div>
        <span
          className={`text-[1rem] md:text-[1.563rem] font-bold md:font-normal md:leading-4 ${
            showResultsForValue && searchResults?.length && searchKeyword ? '' : 'hidden'
          }`}
        >
          {t('SearchResultsFor', {
            keyword: showResultsForValue,
          })}
        </span>
      </h1>

      <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9 ">
        <div className=" hidden lg:flex items-center justify-start gap-[3.375rem] pb-[1.313rem] border-b-[0.063rem] border-black border-solid">
          <div className="flex relative items-center">
            <button
              className={`w-[11.938rem] h-[3.125rem] text-left border border-solid placeholder-darkGray border-aubergine rounded-xxl py-[0.75rem] pr-[1.25rem] pl-[3.063rem] ${
                showExpandedSearch && isDesktop ? 'bg-mainPurple text-white' : ''
              }`}
              value={showExpandedSearch ? '' : searchInputValue}
              onClickCapture={() => {
                setShowExpandedSearch(true);
              }}
              onClick={() => showExpandedSearch && expandedSearchRef?.current?.focus()}
            >
              {t('SearchBar')}
            </button>
            <div
              className="absolute left-[0.813rem] cursor-pointer"
              onClick={() => setShouldFetchSearchItems(true)}
            >
              <SearchIcon fill={showExpandedSearch && isDesktop ? 'white' : ''} />
            </div>
          </div>
          {pageTypes.length > 0 && (
            <button
              onClick={() => {
                clearFilters();
                setFilter('');
              }}
              className={`${
                filter == ''
                  ? 'text-shadow-black border-b-[0.125rem] border-black border-solid mb-[-0.125rem]'
                  : 'hover:text-shadow-black'
              } `}
            >
              {t('All')}
            </button>
          )}

          {pageTypes.map((item) => {
            if (item.text === 'General') return null;
            return (
              <button
                onClick={() => {
                  clearFilters();
                  setFilter(item.text);
                  setSortDirectionType(item.text === 'People' ? 'name' : 'published_date');
                }}
                key={item.text}
                className={`${
                  filter == item.text
                    ? 'text-shadow-black border-b-[0.125rem] border-black border-solid mb-[-0.125rem]'
                    : 'hover:text-shadow-black'
                } `}
              >
                {item.text}
              </button>
            );
          })}
        </div>
        {(showExpandedSearch || !isDesktop) && (
          <div className={`flex relative items-center`}>
            <input
              ref={expandedSearchRef}
              autoFocus
              placeholder={t('SearchBar')}
              spellCheck={true}
              className="lg:p-[1.375rem_6.813rem_1.875rem_4.625rem] py-[0.75rem] px-[1.25rem] pl-[2.438rem] w-full border border-solid border-aubergine rounded-xxl lg:border-none lg:rounded-none font-arial font-normal leading-normal lg:text-[1.5rem] lg:text-white lg:placeholder-white !outline-none bg-inherit lg:bg-mainPurple"
              value={searchInputValue}
              onChange={(event) => setSearchInputValue(event?.target?.value)}
              onKeyDown={(event) => {
                if (event?.key === 'Enter') {
                  clearFilters();
                  setFilter('');
                  setSelectedJurisdictionFilters([]);
                  setShouldFetchSearchItems(true);
                  setSearchKeyword(searchInputValue);
                }
              }}
            />
            <div
              className="absolute lg:left-[2.5rem] left-[0.813rem] cursor-pointer"
              onClick={() => {
                clearFilters();
                setFilter('');
                setSelectedJurisdictionFilters([]);
                setShouldFetchSearchItems(true);
                setSearchKeyword(searchInputValue);
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
      </div>
      <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-3 row-span-3 flex flex-col gap-[0.231rem] lg:gap-[3rem]">
        <JurisdictionFilter
          selectedFilters={selectedJurisdictionFilters}
          jurisdictionsFilters={jurisdictionsFilters}
          toggleFilter={(id: string) => {
            setPageNumber(1);
            if (!selectedJurisdictionFilters.includes(id)) {
              setSelectedJurisdictionFilters([...selectedJurisdictionFilters, id]);
            } else {
              setSelectedJurisdictionFilters(
                selectedJurisdictionFilters.filter((filterId) => filterId !== id)
              );
            }
          }}
        />
        <div className="relative">
          <FiltersMobileOverlay updateFilters={updateFilters} filters={filters} />
          <button
            className=" text-mainPurple small-text hidden lg:block absolute right-0"
            onClick={() => clearFilters()}
          >
            {t('ResetFilters')}
          </button>
          <div className="hidden lg:flex flex-col gap-[0.688rem] lg:gap-[3rem]">
            <Sorting
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              heading={filter == 'People' ? t('SortByName') : t('SortByDate')}
              category={filter}
            />
            <TopicsSorting
              setActiveTopics={setActiveTopics}
              activeTopics={activeTopics}
              topicsList={topicsList}
            />
            <ServicesFilterList
              activeItems={servicesListItems}
              setActiveItems={setServicesListItems}
              servicesList={servicesList}
            />
            <SectorFilterList
              activeItems={sectorListItems}
              setActiveItems={setSectorListItems}
              sectorList={sectorList}
            />
          </div>
        </div>
        <div className="lg:hidden">
          <Select
            onValueChange={(value) => {
              clearFilters();
              setFilter(value);
            }}
            value={filter}
          >
            <SelectTrigger className=" text-[1rem] placeholder-content-type border border-solid placeholder-aubergine border-aubergine rounded-xxl py-[1.5rem] px-[1.25rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={''} className="hover:font-semibold [&>span>span]:hidden">
                <span className="text-aubergine">{t('ContentType')}: </span>
                {t('All')}
              </SelectItem>
              {pageTypes.map((item, index) => {
                if (item.text === 'General') return null;
                return (
                  <SelectItem
                    key={index + item.text}
                    value={item.text}
                    className="hover:font-semibold [&>span>span]:hidden"
                  >
                    <span className="text-aubergine">{t('ContentType')}: </span>
                    {item.text}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-9">
        {searchResults?.length ? (
          <>
            <SerchResultsPersonCard personList={searchResults} />
            <SearchResultsPagination
              resultsLimit={resultsLimit}
              pageNumber={pageNumber}
              totalResults={search?.widgets?.[0]?.total_item || 0}
              setPageNumber={setPageNumber}
              setResultsLimit={setResultsLimit}
              resultsPerPage={props.fields?.data?.datasource?.ResultsPerPage?.targetItems}
            />
          </>
        ) : (
          <NoItemsFound keyword={showResultsForValue ? '"' + showResultsForValue + '"' : ''} />
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
