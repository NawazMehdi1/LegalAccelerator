import { useI18n } from 'next-localization';
import { SORT } from 'utils/search';
import { useState } from 'react';
import PaginationExpand from 'core/atoms/Icons/PaginationExpand';

type SortProps = {
  name: string;
  sortDirection?: string;
  setSortDirection: (name: string, direction?: SORT) => void;
  clearFilters: () => void;
  heading: string;
};

const Sorting = ({ name, sortDirection, setSortDirection, heading, clearFilters }: SortProps) => {
  const { t } = useI18n();
  const [currentSortDirection, setCurrentSortDirection] = useState(sortDirection);

  const toggleSortDirection = () => {
    const newSortDirection = currentSortDirection === SORT.DESC ? SORT.ASC : SORT.DESC;
    setCurrentSortDirection(newSortDirection);
    setSortDirection(name, newSortDirection);
  };
  return (
    <div className="flex flex-wrap gap-y-[17px] gap-x-[43px]">
      <div className="w-full flex items-center gap-[14px]">
        <button className="small-text" onClick={() => clearFilters()}>
          {t('ResetFilters')}
        </button>
        <h4 className="text-sm font-bold font-arial tracking-[0.56px]">{heading}</h4>
        <button onClick={toggleSortDirection} className={'hidden md:block'}>
          <PaginationExpand
            className={`inline mr-[3px] ${
              currentSortDirection === SORT.ASC ? 'rotate-[90deg]' : 'rotate-[270deg]'
            }`}
          />
        </button>
      </div>
      <button
        onClick={() => {
          setSortDirection(name, SORT.ASC);
        }}
        className={`md:hidden
          ${
            sortDirection === SORT.ASC
              ? ` border-b-[2px] border-black border-solid text-shadow-black mb-[-2px] text-black`
              : 'hover:text-shadow-black text-black'
          } 
        `}
      >
        {t('Ascending')}
      </button>
      <button
        onClick={() => {
          setSortDirection(name, SORT.DESC);
        }}
        className={`md:hidden
          ${
            sortDirection === SORT.DESC
              ? ` border-b-[2px] border-black border-solid text-shadow-black  mb-[-2px]`
              : 'hover:text-shadow-black'
          } `}
      >
        {t('Descending')}
      </button>
    </div>
  );
};

export default Sorting;
