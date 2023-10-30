import MobileFilterCheckbox from './MobileFilterCheckbox';
import { FacetValueItem } from 'utils/search/search.types';

type MobileServiceFilterProps = {
  setFilter: (value: string[]) => void;
  activeItems: string[];
  items?: FacetValueItem[];
  title?: string;
};

const MobileServiceFilter = ({
  setFilter,
  activeItems,
  items,
  title,
}: MobileServiceFilterProps) => {
  if (items?.length === 0) {
    return <></>;
  }

  return (
    <div className="relative">
      <h4 className="text-mainPurple button-text mb-[20px] tracking-[0.035rem]">{title}</h4>
      <ul className="filter-scroll overflow-y-auto">
        {items?.map((Services, index) => {
          return (
            <MobileFilterCheckbox
              key={index}
              CheckBox={Services}
              setActiveItems={setFilter}
              activeItems={activeItems}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MobileServiceFilter;
