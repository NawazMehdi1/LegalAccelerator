/* eslint-disable react-hooks/exhaustive-deps */
import PaginationExpand from 'core/atoms/Icons/PaginationExpand';
import CheckboxItem from 'core/molecules/JurisdictionCheckbox/JurisdictionCheckbox';
import { useI18n } from 'next-localization';
import { useState } from 'react';

interface JurisdictionFilterProps {
  jurisdictionsFilters: JurisdictionItem[];
  selectedFilters: string[];
  toggleFilter: (id: string) => void;
}
export interface Widgets {
  widgets: {
    facet: [
      {
        label: string;
        name: string;
        value: Array<JurisdictionItem>;
      }
    ];
  }[];
}

interface JurisdictionItem {
  id: string;
  text: string;
}

const JurisdictionFilter = ({
  selectedFilters,
  jurisdictionsFilters,
  toggleFilter,
}: JurisdictionFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const selectedFiltersNames = jurisdictionsFilters
    .filter((filter) => selectedFilters.includes(filter.id))
    .map((filter) => filter.text)
    .join(', ');
  const isScrollEnabled = jurisdictionsFilters.length > 10;

  if (!jurisdictionsFilters?.length) {
    return null;
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex w-full min-h-[50px] relative border border-solid placeholder-aubergine border-aubergine rounded-xxl py-[12px] px-[20px] text-left text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`relative text-ellipsis overflow-hidden whitespace-nowrap mr-[20px] ${
            selectedFiltersNames ? 'top-[5px] text-darkGrey ml-[4px]' : ''
          }`}
        >
          {selectedFiltersNames || t('JurisdictionFilterTitle')}
        </span>
        <PaginationExpand
          className={`${
            isOpen ? 'rotate-[270deg]' : 'rotate-[90deg]'
          } absolute right-[22px] top-[16px]`}
        />
        {selectedFiltersNames && (
          <span className="absolute text-[10px] leading-[140%] font-arial text-black left-[25px] top-[8px]">
            {t('JurisdictionFilterTitle')}
          </span>
        )}
      </button>
      {isOpen && (
        <ul
          className={`top-[60px] lg:top-[68px] max-h-[100vh] w-full absolute z-[10] bg-mainPurple text-white ${
            isScrollEnabled ? 'overflow-y-scroll h-[400px]' : ''
          }`}
        >
          {jurisdictionsFilters?.map((checkbox) => {
            return (
              <CheckboxItem
                checkbox={checkbox}
                key={checkbox.id}
                isChecked={!!selectedFilters.includes(checkbox.id)}
                toggleIsChecked={() => toggleFilter(checkbox.id)}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default JurisdictionFilter;
