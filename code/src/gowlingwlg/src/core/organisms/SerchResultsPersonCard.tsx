import Link from 'next/link';
import { SearchResultCard } from 'lib/component-props';
import Image from 'next/image';
import Envelope from 'core/atoms/Icons/Envelope';
import Mobile from 'core/atoms/Icons/Mobile';
import ShareButton from 'core/molecules/ShareButton';
import { newFormatDate } from 'core/utils/formatDate';
import { useI18n } from 'next-localization';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { truncateText } from 'core/utils/truncateText';

const SerchResultsPersonCard = ({
  personList,
}: {
  personList: SearchResultCard[];
}): JSX.Element => {
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  return (
    <div data-testid="search-results-list">
      {personList?.map((item: SearchResultCard) => {
        return (
          <article
            key={item.id}
            className="grid grid-cols-searchResultsCard py-[20px] md:py-[36px] border-b-[1px] border-black border-solid gap-y-[0] md:gap-y-[18px]"
          >
            {item.type != 'General' && (
              <div className="row-start-1 flex items-center gap-[14px] col-start-2">
                {item.content_type_icon && (
                  <Image
                    className="hidden md:block"
                    src={item.content_type_icon}
                    alt="icon"
                    height="18"
                    width="18"
                  />
                )}
                <p className="md:font-bold uppercase md:capitalize  md:text-lightBlue small-text md:text-[16px]">
                  {item.type}
                </p>
                {item.published_date && item.published_date != '0001-01-01T00:00:00Z' && (
                  <p className="small-text md:text-[16px] text-mainPurple md:text-black">
                    {t('Published')}{' '}
                    {newFormatDate(
                      item.published_date,
                      sitecoreContext.language as unknown as string
                    )}
                  </p>
                )}
              </div>
            )}
            {item.profile_image && (
              <Link
                href={item.url}
                className="bg-extraLightGrey rounded-full h-[200px] w-[200px] overflow-hidden col-span-2 md:col-span-1 row-span1 md:row-span-5 flex mr-[20px]"
              >
                <Image src={item.profile_image} alt="profile image" height="200" width="200" />
              </Link>
            )}

            <Link href={item.url} className="col-start-2">
              <h2 className="text-base md:text-2xl pb-[10px] md:pb-[0]">
                {item.firstname || item.lastname
                  ? `${item.firstname ?? ''} ${item.lastname ?? ''}`
                  : item.name}
              </h2>
            </Link>
            {item.description && (
              <p className="col-start-2 leading-[156%] pb-[10px] md:pb-[0]">
                {truncateText(400, item.description)}
              </p>
            )}
            <div className="col-start-2 flex flex-wrap items-center gap-x-[22px] gap-y-[26px]">
              <div className="w-full md:w-auto">
                <ShareButton />
              </div>
              {item.email && (
                <a
                  className="small-text flex items-center gap-x-[8px] hover:underline"
                  href={`mailto:${item.email}`}
                >
                  <span className="bg-mainPurple text-white py-[7px] px-[8px] rounded-full">
                    <Envelope fill="white" />
                  </span>
                  {item.email}
                </a>
              )}
              {item.phone_number && (
                <a
                  className="small-text flex items-center gap-x-[8px] hover:underline"
                  href={`tel:${item.phone_number}`}
                >
                  <span className="bg-mainPurple text-white p-[7px] rounded-full">
                    <Mobile />
                  </span>
                  {item.phone_number}
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default SerchResultsPersonCard;
