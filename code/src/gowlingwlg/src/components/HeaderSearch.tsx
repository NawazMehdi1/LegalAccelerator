import React, { useEffect, useLayoutEffect, useState } from 'react';
import Head from 'next/head';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { Link, LinkField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import InsightsSearchResults from 'core/organisms/HeaderSearch/InsightsSearchResults';
import SectorsSearchResults from 'core/organisms/HeaderSearch/SectorsSearchResults';
import ServicesSearchResults from 'core/organisms/HeaderSearch/ServicesSearchResults';
import PeopleSearchResults from 'core/organisms/HeaderSearch/PeopleSearchResults';
import { ComponentProps } from 'lib/component-props';
import { SearchResultCard } from 'lib/component-props';
import { useQuery } from '@tanstack/react-query';
import headerSearchQueryFn from 'core/api/queries/headerSearchQueryFn';
import NoItemsFound from 'core/molecules/NoItemsFound';
import useLanguageHook from 'core/hooks/useLanguageHook';
import SearchIcon from '../core/atoms/Icons/SearchIcon';
import CloseIcon from '../core/atoms/Icons/CloseIcon';
import { useAtom } from 'jotai';
import { hamburgerMenuVisibilityAtom } from '../core/molecule state/visibilityAtom';
import { HAMBURGER_SCROLL_GAP } from 'constants/ui';
import { useI18n } from 'next-localization';

export interface Suggestion {
  text: string;
  freq: number;
}
export interface Widgets {
  widgets: {
    total_item: number;
    content: Array<SearchResultCard>;
    suggestion: {
      name_suggester: Suggestion[];
    };
  }[];
}

type HeaderSearchProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        PlaceholderText: { jsonValue: { value: string } };
        SectorsLabel: { jsonValue: { value: string } };
        PeopleLabel: { jsonValue: { value: string } };
        ServicesLabel: { jsonValue: { value: string } };
        InsightsLabel: { jsonValue: { value: string } };
        InsightsLink: { jsonValue: { value: LinkField } };
        SectorsLink: { jsonValue: { value: LinkField } };
        ServicesLink: { jsonValue: { value: LinkField } };
        PeopleLink: { jsonValue: { value: LinkField } };
      };
    };
  };
};

export interface ContextFields {
  [key: string]: unknown;
  Role: Field<string>;
}

const HeaderSearch = ({ fields }: HeaderSearchProps): JSX.Element => {
  const { country, language } = useLanguageHook();
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [, setSearchResults] = useState<SearchResultCard[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const searchApiUrl = sitecoreContext?.SearchApiUrl as string;
  const searchSource = sitecoreContext?.SearchSource as string;
  const [relevantResults, setRelevantResults] = useState<SearchResultCard[]>([]);
  const [insightsResults, setInsightsResults] = useState<SearchResultCard[]>([]);
  const [sectorsResults, setSectorsResults] = useState<SearchResultCard[]>([]);
  const [servicesResults, setServicesResults] = useState<SearchResultCard[]>([]);
  const [peopleResults, setPeopleResults] = useState<SearchResultCard[]>([]);
  const contextFields = sitecoreContext?.route?.fields as ContextFields;
  const contextRoute = sitecoreContext?.route?.name as string;
  const [showResultsForValue, setShowResultsForValue] = useState<string>(' ');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const { data } = useQuery({
    queryKey: ['globalsearch', { searchKeyword: searchInputValue }],
    queryFn: () =>
      headerSearchQueryFn(searchApiUrl, {
        searchSource,
        searchKeyword: searchInputValue,
        country,
        language,
      }),
    enabled: modalOpen, // Fetch data only when modal is open
  });
  const [scrolling, setScrolling] = useState(false);
  const [isHamburgerMenuVisible, setIsHamburgerMenuVisible] = useAtom(hamburgerMenuVisibilityAtom);
  const toggleHamburgerMenuVisibility = () => {
    setIsHamburgerMenuVisible(!isHamburgerMenuVisible);
  };

  useEffect(() => {
    // Check if the page was refreshed
    const pageRefreshed = localStorage.getItem('pageRefreshed') === 'true';

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Run the handleScroll function immediately if the page was refreshed
    if (pageRefreshed) {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll);

    // Set a flag in localStorage to indicate that the page has been refreshed
    localStorage.setItem('pageRefreshed', 'true');

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isNeedScrolling = sitecoreContext.route?.name == 'Home';

  useEffect(() => {
    if (modalOpen) {
      document.getElementsByTagName('html')[0].classList.add('overflow-hidden');
    } else {
      document.getElementsByTagName('html')[0].classList.remove('overflow-hidden');
    }
    setShowResultsForValue(searchInputValue);
  }, [modalOpen, searchInputValue]);

  useEffect(() => {
    if (data?.widgets?.[0]?.content) {
      const relevantSearchResults: SearchResultCard[] = [];
      const categorizedResults: {
        Insights: SearchResultCard[];
        Sectors: SearchResultCard[];
        Services: SearchResultCard[];
        People: SearchResultCard[];
      } = {
        Insights: [],
        Sectors: [],
        Services: [],
        People: [],
      };

      // Categorize search results based on their type
      data.widgets[0].content.forEach((item) => {
        relevantSearchResults.push(item);
        switch (item.type) {
          case 'Insights':
            categorizedResults.Insights.push(item);
            break;
          case 'Sectors':
            categorizedResults.Sectors.push(item);
            break;
          case 'Services':
            categorizedResults.Services.push(item);
            break;
          case 'People':
            categorizedResults.People.push(item);
            break;
          default:
            break;
        }
      });

      // Update state with categorized results
      setRelevantResults(relevantSearchResults);
      setInsightsResults(categorizedResults.Insights);
      setSectorsResults(categorizedResults.Sectors);
      setServicesResults(categorizedResults.Services);
      setPeopleResults(categorizedResults.People);
    } else {
      // Clear search results when no data is available
      setRelevantResults([]);
      setInsightsResults([]);
      setSectorsResults([]);
      setServicesResults([]);
      setPeopleResults([]);
    }
  }, [data]);

  const handleSearchBoxClick = () => {
    window.scroll({
      top: window.scrollY + HAMBURGER_SCROLL_GAP,
    });
    setModalOpen(true);
    toggleHamburgerMenuVisibility();
  };
  const handleCloseModal = () => {
    window.scroll({
      top: window.scrollY - HAMBURGER_SCROLL_GAP,
    });
    setModalOpen(false);
    setSearchResults([]); // Clear search results when modal is closed
    toggleHamburgerMenuVisibility();
  };
  const [width] = useWindowSize();
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  const handleSuggestionSelect = (selectedSuggestion: string) => {
    setSelectedSuggestion(selectedSuggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    if (selectedSuggestion) {
      setSearchInputValue(selectedSuggestion);
    }
  }, [selectedSuggestion]);

  const handleSearch = () => {
    if (searchInputValue.trim() !== '' && searchInputValue.length >= 3) {
      const searchKeyword = encodeURIComponent(searchInputValue);
      window.location.href = `/search-results?keyword=${searchKeyword}`;
    }
  };

  const updateSuggestions = (input: string) => {
    // Filter suggestions based on input (at least 3 characters)
    if (input) {
      const filteredSuggestions =
        data?.widgets?.[0]?.suggestion?.name_suggester
          .map((item) => item.text)
          .filter((suggestion) => suggestion.includes(input)) || [];

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input is less than 3 characters
    }
  };

  // Change this useEffect to watch for changes in 'data'
  useEffect(() => {
    if (data) {
      // Call updateSuggestions when data is available
      updateSuggestions(searchInputValue);
    }
  }, [data, searchInputValue]);

  return (
    <>
      {contextFields?.Role?.value && (
        <Head>
          <meta name="authorRole" content={contextFields?.Role?.value} />
        </Head>
      )}

      {contextRoute == 'Home' ? (
        <>
          <div
            className="flex justify-end header-search relative lg:w-[11.063rem] lg:h-[3rem] md:mx-6 md:pl-0 grow md:grow-0"
            onClick={handleSearchBoxClick}
          >
            <input
              className={`hidden outline-offset-0 lg:block border border-solid border-1 rounded-3xl h-full w-[11.063rem] pr-5 pl-[3.125rem] px-6 ${
                modalOpen
                  ? 'bg-aubergine border-aubergine text-white placeholder-white'
                  : 'bg-white border-aubergine text-black placeholder-aubergine'
              }`}
              type="search"
              placeholder={fields?.data?.datasource?.PlaceholderText?.jsonValue?.value}
              onKeyDown={(event) => event?.key === 'Enter' && setModalOpen(true)}
              readOnly
            />
            <span className="md:absolute inset-y-0 left-[1.5rem] flex items-center md:pr-8">
              <SearchIcon
                fill={`${
                  width > 768
                    ? modalOpen
                      ? 'white'
                      : 'black'
                    : modalOpen
                    ? 'black'
                    : isNeedScrolling
                    ? scrolling
                      ? 'black'
                      : 'white'
                    : 'black'
                }`}
                className="h-[1.875rem] w-[1.875rem] md:h-[1.25rem] md:w-[1.25rem]"
              />
            </span>
          </div>
          <div className="relative">
            <button
              className={` absolute right-[-6.75rem] min-[82.188rem]:right-[-8rem] top-[12%] z-[9999] ${
                modalOpen ? 'md:block hidden' : 'hidden'
              }`}
              onClick={handleCloseModal}
            >
              <CloseIcon fill="#39224E" height={36} width={36} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            className="flex justify-end header-search relative lg:w-[11.063rem] lg:h-[3rem] md:mx-6 md:pl-0 grow md:grow-0"
            onClick={handleSearchBoxClick}
          >
            <input
              className={`hidden outline-offset-0 lg:block border border-solid border-1 rounded-3xl h-full w-[11.063rem] pr-5 pl-[3.125rem] px-6 ${
                modalOpen
                  ? 'bg-aubergine border-aubergine text-white placeholder-white'
                  : 'bg-white border-black text-black placeholder-black'
              }`}
              type="search"
              placeholder={fields?.data?.datasource?.PlaceholderText?.jsonValue?.value}
              onKeyDown={(event) => event?.key === 'Enter' && setModalOpen(true)}
              readOnly
            />
            <span className="md:absolute inset-y-0 left-[1.5rem] flex items-center md:pr-8">
              <SearchIcon
                fill={`${
                  width > 768
                    ? modalOpen
                      ? 'white'
                      : 'black'
                    : modalOpen
                    ? 'black'
                    : isNeedScrolling
                    ? scrolling
                      ? 'black'
                      : 'white'
                    : 'black'
                }`}
                className="h-[1.875rem] w-[1.875rem] md:h-[1.25rem] md:w-[1.25rem]"
              />
            </span>
          </div>
          <div className="relative">
            <button
              className={` absolute right-[-6.75rem] min-[82.188rem]:right-[-8rem] top-[12%] z-[9999] ${
                modalOpen ? 'md:block hidden' : 'hidden'
              }`}
              onClick={handleCloseModal}
            >
              <CloseIcon fill="#39224E" height={36} width={36} />
            </button>
          </div>
        </>
      )}
      {modalOpen && (
        <div className="flex items-center justify-center z-[1000] fixed pt-[3.313rem] xl:pt-[4.688rem] left-0 w-full h-full">
          <div className="flex flex-col overflow-hidden bg-white w-full h-full shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]">
            <button
              className="md:hidden absolute right-[1.563rem] pt-[6%] z-10"
              onClick={handleCloseModal}
            >
              <CloseIcon fill="#39224E" height={36} width={36} />
            </button>
            <div className="header-search relative h-[full]">
              <button
                className="absolute inset-y-0 pl-5 lg:pl-[6.25rem] 2xl:pl-[14.375rem] top-[-0.438rem] left-0 flex items-center"
                onClick={handleSearch}
              >
                <SearchIcon fill="white" className="h-[1.875rem] w-[1.875rem] md:h-6 md:w-6" />
              </button>
              <input
                className="bg-mainPurple w-full px-[3.125rem] lg:px-[8.125rem] 2xl:px-[16.25rem] h-[full] pt-[1.375rem] pb-[1.875rem] text-[1.5rem] text-white placeholder-white"
                placeholder={fields?.data?.datasource?.PlaceholderText?.jsonValue?.value}
                autoComplete="off"
                value={searchInputValue}
                name="query"
                onChange={(e) => setSearchInputValue(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleSearch();
                  }
                }}
              />
              <div className="absolute overflow-y-auto px-[1.25rem] lg:px-[6.25rem] 2xl:px-[16.25rem]">
                {!data?.widgets?.[0]?.content &&
                  searchInputValue.length >= 3 &&
                  suggestions.length > 0 && (
                    <ul className="flex flex-col gap-[0.75rem] mt-[1.438rem] mb-[1.938rem]">
                      <li className="font-bold cursor-pointer leading-[156%]">{t('DidYouMean')}</li>
                      {suggestions.map((suggestion, index) => (
                        <li
                          className="cursor-pointer leading-[156%]"
                          key={index}
                          onClick={() => handleSuggestionSelect(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-[1.25rem] py-[1.563rem] lg:px-[6.25rem] 2xl:px-[14.375rem]">
              {searchInputValue.trim() !== '' && relevantResults.length === 0 ? (
                <NoItemsFound keyword={`"${showResultsForValue}"`} />
              ) : (
                <>
                  {relevantResults.length > 0 && (
                    <div className="flex flex-col pt-[0.625rem] pb-[1.25rem] mb-[1.25rem] border-b-[1px] border-darkGrey border-solid gap-y-[0.625rem]">
                      {relevantResults.slice(0, 4)?.map((item: SearchResultCard) => {
                        return (
                          <a key={item.id} href={item.url} className="col-start-2">
                            <h4 className="text-base font-arial font-normal hover:font-bold">
                              {item.name}
                            </h4>
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {sectorsResults.length > 0 && (
                    <div className="flex flex-col pb-[1.25rem] mb-[1.25rem] border-b-[1px] border-darkGrey border-solid gap-y-[0.625rem]">
                      <h4 className="text-base font-arial font-bold">
                        {fields?.data?.datasource?.SectorsLabel?.jsonValue?.value}
                      </h4>
                      <SectorsSearchResults searchList={sectorsResults.slice(0, 3)} />
                      <Link
                        field={fields?.data?.datasource?.SectorsLink?.jsonValue}
                        className="col-start-2 font-bold text-lightBlue"
                      />
                    </div>
                  )}

                  {servicesResults.length > 0 && (
                    <div className="flex flex-col pb-[1.25rem] mb-[1.25rem] border-b-[1px] border-darkGrey border-solid gap-y-[0.625rem]">
                      <h4 className="text-base font-arial font-bold">
                        {fields?.data?.datasource?.ServicesLabel?.jsonValue?.value}
                      </h4>
                      <ServicesSearchResults searchList={servicesResults.slice(0, 3)} />
                      <Link
                        field={fields?.data?.datasource?.ServicesLink?.jsonValue}
                        className="col-start-2 font-bold text-lightBlue"
                      />
                    </div>
                  )}

                  {insightsResults.length > 0 && (
                    <div className="flex flex-col pb-[1.25rem] mb-[1.25rem] border-b-[1px] border-darkGrey border-solid gap-y-[0.625rem] ">
                      <h4 className="text-base font-arial font-bold">
                        {fields?.data?.datasource?.InsightsLabel?.jsonValue?.value}
                      </h4>
                      <InsightsSearchResults searchList={insightsResults.slice(0, 3)} />
                      <Link
                        field={fields?.data?.datasource?.InsightsLink?.jsonValue}
                        className="col-start-2 font-bold text-lightBlue"
                      />
                    </div>
                  )}

                  {peopleResults.length > 0 && (
                    <div className="pb-[1.25rem] flex flex-col mb-[1.25rem] border-b-[1px] border-darkGrey border-solid gap-y-[0.625rem]">
                      <h4 className="text-base font-arial font-bold">
                        {fields?.data?.datasource?.PeopleLabel?.jsonValue?.value}
                      </h4>
                      <PeopleSearchResults searchList={peopleResults.slice(0, 4)} />
                      <Link
                        field={fields?.data?.datasource?.PeopleLink?.jsonValue}
                        className="col-start-2 font-bold text-lightBlue"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSearch;
