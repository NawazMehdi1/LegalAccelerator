import React from 'react';
import CheckboxItem from '../../organisms/ServicesFilterList';
import { useI18n } from 'next-localization';

export interface Widgets {
  widgets: {
    total_item: number;
    facet: {
      value: Array<Services>;
    }[];
  }[];
}

export interface Services {
  id: string;
  count?: number;
  text: string;
}

const ServiceFilterList = ({
  setActiveItems,
  activeItems,
  servicesList,
}: {
  setActiveItems: (value: []) => void;
  activeItems: string[];
  servicesList: Services[];
}) => {
  const { t } = useI18n();

  if (servicesList?.length === 0) {
    return <></>;
  }

  return (
    <div className="relative">
      <h4 className="text-mainPurple button-text mb-[20px] tracking-[0.035rem]">
        {t('ServicesFilterTitle')}
      </h4>
      <ul className="filter-scroll overflow-y-auto">
        {servicesList?.map((Services, index) => {
          return (
            <CheckboxItem
              key={index}
              CheckBox={Services}
              setActiveItems={setActiveItems}
              activeItems={activeItems}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ServiceFilterList;
