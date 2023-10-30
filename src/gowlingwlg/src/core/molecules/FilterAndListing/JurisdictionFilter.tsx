/* eslint-disable react-hooks/exhaustive-deps */
import PaginationExpand from 'core/atoms/Icons/PaginationExpand';
import CheckboxItem from 'core/molecules/JurisdictionCheckbox/JurisdictionCheckbox';
import { useI18n } from 'next-localization';
import { useState } from 'react';
import { FilterOption } from 'utils/search';

interface JurisdictionFilterProps {
  selectedJurisdictions?: FilterOption[];
  jurisdictions?: FilterOption[];
  toggleFilter: (option: FilterOption) => void;
}

const JurisdictionFilter = ({
  selectedJurisdictions,
  jurisdictions,
  toggleFilter,
}: JurisdictionFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const selectedFiltersNames = selectedJurisdictions
    ?.map((jurisdiction) => jurisdiction.value)
    .join(', ');

  if (!jurisdictions?.length) {
    return null;
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex w-full bg-white lg:bg-transparent lg:w-[20rem] min-h-[50px] relative border border-solid placeholder-aubergine border-aubergine rounded-xxl py-[12px] px-[20px] text-left text-gray-600"
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
            jurisdictions?.length > 10 ? 'overflow-y-scroll h-[400px]' : ''
          }`}
        >
          {jurisdictions?.map((jurisdiction) => {
            return (
              <CheckboxItem
                checkbox={{ id: jurisdiction.value, text: jurisdiction.value }}
                key={jurisdiction.value}
                isChecked={
                  !!selectedJurisdictions?.find((item) => item.value === jurisdiction.value)
                }
                toggleIsChecked={() => toggleFilter(jurisdiction)}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default JurisdictionFilter;
