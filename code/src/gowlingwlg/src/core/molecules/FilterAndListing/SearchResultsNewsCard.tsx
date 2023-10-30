import Link from 'next/link';
import Image from 'next/image';
import { newFormatDate } from 'core/utils/formatDate';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { truncateText } from 'core/utils/truncateText';
import { Content } from './ContentTypes';

const SearchResultsNewsCard = ({ items }: { items: Content[] }): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  return (
    <div
      data-testid="search-results-list"
      className="grid-cols-1 lg:grid-cols-3 grid lg:gap-x-5 lg:gap-y-7 pt-[20px] lg:pt-0"
    >
      {items?.map((item: Content, index: number) => {
        const is2ColumnFormat = index === 0 || index === 6; // 1st and 7th items

        return (
          <Link
            href={item.url}
            key={item.id}
            className={`bg-white w-full py-[20px] px-0 border-b-[1px] border-black border-solid lg:border-none lg:py-[45px] lg:px-[30px] max-w-[1200px] 2xl:max-w-[1440px] mx-auto ${
              is2ColumnFormat ? 'lg:col-span-2' : ''
            }`}
          >
            {item.type !== 'General' && (
              <div className="flex gap-[11px] items-center">
                {item.content_type_icon && (
                  <Image
                    className="hidden lg:flex h-[25px]"
                    src={item.content_type_icon}
                    alt="icon"
                    height="18"
                    width="18"
                  />
                )}
                <p className="lg:font-bold leading-[140%] small-text flex uppercase lg:capitalize text-black lg:text-lightBlue lg:text-[16px] lg:leading-normal">
                  {item.type}
                </p>
                {item.published_date && item.published_date !== '0001-01-01T00:00:00Z' && (
                  <p className="flex leading-[156%] small-text lg:text-[16px] text-mainPurple lg:text-black">
                    {newFormatDate(
                      item.published_date,
                      sitecoreContext.language as unknown as string
                    )}
                  </p>
                )}
              </div>
            )}
            <h4 className="font-arial mt-[3px] lg:mt-[20px] text-base lg:text-2xl lg:pb-[3px] leading-normal">
              {item.name}
            </h4>
            {item.description && (
              <p className="leading-[156%]">{truncateText(400, item.description)}</p>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResultsNewsCard;
