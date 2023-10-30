import React, { useState, useEffect } from 'react';
import CloseIcon from 'core/atoms/Icons/CloseIcon';
import Sorting from 'core/molecules/Sorting';
import { useI18n } from 'next-localization';
import TopicsSorting from 'core/molecules/TopicsSorting';
import SectorFilterList from '../atoms/SearchFilters/SectorFilter';
import ServicesFilterList from '../atoms/SearchFilters/ServiceFilter';

type filtersType = {
  sortDirection?: string;
  filter?: string;
};

type listOfFiltersType = {
  text: string;
  id: string;
  count?: number;
};

type propsType = {
  updateFilters: (filters: filtersType) => void;
  filters: {
    sectorListItems: string[];
    servicesListItems: string[];
    sortDirection: string;
    filter: string;
    activeTopics: string[];
    topicsList: listOfFiltersType[];
    servicesList: listOfFiltersType[];
    sectorList: listOfFiltersType[];
  };
};

const FiltersMobileOverlay = ({ updateFilters, filters }: propsType) => {
  const { t } = useI18n();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState(filters.sortDirection);
  const [activeTopics, setActiveTopics] = useState<string[]>(filters.activeTopics);
  const [sectorListItems, setSectorListItems] = useState(filters.sectorListItems);
  const [servicesListItems, setServicesListItems] = useState(filters.servicesListItems);

  useEffect(() => {
    if (filtersOpen) {
      document.body.classList.add('h-[100vh]');
    } else {
      document.body.classList.remove('h-[100vh]');
    }
  }, [filtersOpen]);

  const formState = {
    servicesListItems: servicesListItems,
    sectorListItems: sectorListItems,
    sortDirection: sortDirection,
    activeTopics: activeTopics,
  };

  const clearFilters = () => {
    setSectorListItems([]);
    setServicesListItems([]);
    setSortDirection('');
    setActiveTopics([]);
  };

  return (
    <>
      <button
        onClick={() => {
          setFiltersOpen(true);
          setActiveTopics(filters.activeTopics);
          setSortDirection(filters.sortDirection);
        }}
        className="flex lg:hidden items-center bg-mainPurple text-white border border-solid placeholder-aubergine border-aubergine rounded-xxl px-[20px] h-[50px] w-full"
      >
        <span className="grow text-left">Filter</span>
        <span className="font-bold text-3xl">+</span>
      </button>
      {filtersOpen && (
        <div className="block fixed top-[0] left-[0] h-[100vh] w-[100vw] bg-white z-20 overflow-auto">
          <header className="flex justify-between pb-[40px] p-[24px]">
            <h4 className="subtitle font-bold text-aubergine">Filter My Results</h4>
            <button
              onClick={() => {
                setFiltersOpen(false);
              }}
            >
              <CloseIcon fill="#39224E" />
            </button>
          </header>
          <div className="relative m-[24px] ">
            <button
              className=" text-mainPurple text-base leading-[156%] float-right"
              onClick={() => clearFilters()}
            >
              {t('ResetFilters')}
            </button>
            <div className="flex flex-col gap-[48px] overflow-y-auto filter-overflow">
              <Sorting
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                heading={filters.filter === 'People' ? t('SortByName') : t('SortByDate')}
                category={filters.filter}
              />
              <TopicsSorting
                setActiveTopics={setActiveTopics}
                activeTopics={activeTopics}
                topicsList={filters.topicsList}
              />
              <ServicesFilterList
                activeItems={servicesListItems}
                setActiveItems={setServicesListItems}
                servicesList={filters.servicesList}
              />
              <SectorFilterList
                activeItems={sectorListItems}
                setActiveItems={setSectorListItems}
                sectorList={filters.sectorList}
              />
            </div>
          </div>
          <footer className="fixed flex w-full bottom-[0] bg-mainPurple p-[24px] justify-between">
            <button
              onClick={() => {
                setFiltersOpen(false);
              }}
              className="w-[145px] text-white bg-aubergine rounded-xxl py-[12px] px-[20px]"
            >
              {t('Cancel')}
            </button>
            <button
              onClick={() => {
                updateFilters(formState);
                setFiltersOpen(false);
              }}
              className=" w-[145px] bg-lightBlue text-white rounded-xxl py-[12px] px-[20px]"
            >
              {t('ApplyFilters')}
            </button>
          </footer>
        </div>
      )}
    </>
  );
};
export default FiltersMobileOverlay;
