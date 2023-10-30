import React from 'react';
import CheckboxItem from '../../organisms/SectorFilterList';
import { useI18n } from 'next-localization';

export interface Widgets {
  widgets: {
    total_item: number;
    facet: {
      name: string;
      value: Array<Sectors>;
    }[];
  }[];
}

export interface Sectors {
  id: string;
  count?: number;
  text: string;
}

const SectorFilterList = ({
  setActiveItems,
  activeItems,
  sectorList,
}: {
  setActiveItems: (value: []) => void;
  activeItems: string[];
  sectorList: Sectors[];
}) => {
  const { t } = useI18n();

  if (sectorList?.length === 0) {
    return <></>;
  }

  return (
    <div className="relative">
      <h4 className="text-mainPurple button-text mb-[20px] tracking-[0.035rem]">
        {t('SectorsFilterTitle')}
      </h4>
      <ul className="filter-scroll overflow-y-auto">
        {sectorList?.map((Sectors, index) => {
          return (
            <CheckboxItem
              key={index}
              CheckBox={Sectors}
              setActiveItems={setActiveItems}
              activeItems={activeItems}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SectorFilterList;
