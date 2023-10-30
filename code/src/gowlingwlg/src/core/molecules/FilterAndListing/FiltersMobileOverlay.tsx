import React, { useState, useEffect } from 'react';
import CloseIcon from 'core/atoms/Icons/CloseIcon';
import Sorting from 'core/molecules/Sorting';
import { useI18n } from 'next-localization';
import MobileTopicsSorting from './MobileTopicsSorting';
import { FacetValueItem } from 'utils/search/search.types';
import MobileServiceFilter from './MobileServiceFilter';

type FiltersType = {
  sortDirection?: string;
  filter?: string;
};

type FiltersMobileOverlayProps = {
  updateFilters: (filters: FiltersType) => void;
  filter: string;
  sortDirection: string;
  filterGroups: {
    [k: string]: {
      name: string;
      items: string[];
    };
  };
  facetGroups?: { [k: string]: { name: string; items: FacetValueItem[] } };
};

type AppliedFilters = { [k: string]: string[] };

const FiltersMobileOverlay = (props: FiltersMobileOverlayProps) => {
  const { t } = useI18n();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState(props.sortDirection);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});

  const applyFilter = (key: string, value: string[]) => {
    if (appliedFilters?.[key as keyof typeof appliedFilters]) {
      setAppliedFilters({
        ...appliedFilters,
        [key]: value,
      });
    } else {
      setAppliedFilters({ ...appliedFilters, [key]: value });
    }
  };

  useEffect(() => {
    if (filtersOpen) {
      document.body.classList.add('h-[100vh]');
    } else {
      document.body.classList.remove('h-[100vh]');
    }
  }, [filtersOpen]);

  const formState = {
    sortDirection: sortDirection,
    appliedFilters,
  };

  const clearFilters = () => {
    setSortDirection('');
  };

  return (
    <>
      <button
        onClick={() => {
          setFiltersOpen(true);
          if (props.filterGroups?.['type']) {
            applyFilter('type', props.filterGroups?.['type']?.items);
          }
          setSortDirection(props.sortDirection);
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
          <div className="relative m-6 mb-32">
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
                heading={props.filter === 'People' ? t('SortByName') : t('SortByDate')}
                category={props.filter}
              />
              {Object.keys(props.facetGroups || {}).map((k, i) => {
                const Component = k === 'type' ? MobileTopicsSorting : MobileServiceFilter;
                return (
                  <Component
                    key={`filter_${k}_${i}`}
                    setFilter={(value: string[]) => applyFilter(k, value)}
                    activeItems={appliedFilters[k] || []}
                    items={props.facetGroups?.[k].items}
                    title={props.facetGroups?.[k].name}
                  />
                );
              })}
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
                props.updateFilters(formState);
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
