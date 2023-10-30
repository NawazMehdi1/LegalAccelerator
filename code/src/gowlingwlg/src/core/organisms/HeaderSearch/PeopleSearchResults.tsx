import Link from 'next/link';
import { SearchResultCard } from 'lib/component-props';
import Image from 'next/image';

const PeopleSearchResults = ({ searchList }: { searchList: SearchResultCard[] }): JSX.Element => {
  return (
    <div
      className="grid grid-cols-1 gap-y-[20px] md:grid-cols-4 pt-[7px]"
      data-testid="people-search-results-list"
    >
      {searchList?.map((item: SearchResultCard) => {
        return (
          <Link
            href={item.url}
            className="flex md:grid md:grid-cols-2 hover:font-bold"
            key={item.id}
          >
            {item.profile_image && (
              <div className="bg-extraLightGrey rounded-full h-[100px] w-[100px] overflow-hidden col-span-2 md:col-span-1 row-span1 md:row-span-5 flex mr-[20px]">
                <Image src={item.profile_image} alt="profile image" height="200" width="200" />
              </div>
            )}
            <div className="flex flex-col md:grid">
              <div className="col-start-1">
                <h4 className="text-base font-bold font-arial">{item.name}</h4>
              </div>
              <div className="col-start-1">
                <p className="text-[10px] font-arial font-normal leading-[140%]">
                  {item.authorrole}
                </p>
              </div>
              <div className="col-start-1">
                {item.jurisdictions && item.jurisdictions.length > 0 && (
                  <p className="text-[10px]">{item.jurisdictions.join(', ')}</p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PeopleSearchResults;
