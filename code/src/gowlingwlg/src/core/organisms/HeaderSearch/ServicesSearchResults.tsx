import Link from 'next/link';
import { SearchResultCard } from 'lib/component-props';

const ServicesSearchResults = ({ searchList }: { searchList: SearchResultCard[] }): JSX.Element => {
  return (
    <div data-testid="service-search-results-list">
      <div className="flex flex-col gap-y-[10px]">
        {searchList?.map((item: SearchResultCard) => {
          return (
            <Link key={item.id} href={item.url} className="col-start-2">
              <h4 className="text-base font-arial font-normal hover:font-bold">{item.name}</h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesSearchResults;
