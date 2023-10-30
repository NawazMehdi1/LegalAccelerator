import {
  Text,
  withDatasourceCheck,
  Image as JssImage,
  RichText as JssRichText,
  Link,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { RecentInsightsProps, bgType, styleType } from './RecentInsightsTypes';
import LeftNavigateIcon from 'core/atoms/Icons/LeftNavigateIcon';
import RightNavigateIcon from 'core/atoms/Icons/RightNavigateIcon';
import DownIcon from 'core/atoms/Icons/DownIcon';
import dynamic from 'next/dynamic';
import { useI18n } from 'next-localization';
import { useState, useEffect } from 'react';
import { newFormatDate } from 'core/utils/formatDate';

const Slider = dynamic(() => import('react-slick').then((m) => m.default), {
  ssr: false,
});

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <PrevNavigation />,
  prevArrow: <NextNavigation />,
};

function NextNavigation(props: { onClick?: () => void }) {
  const { onClick } = props;
  return (
    <div
      className="w-[60px] h-[46px] z-[2] bg-maroon hover:brightness-75  absolute bottom-[-115px] hidden md:grid place-content-center cursor-pointer"
      onClick={onClick}
    >
      <LeftNavigateIcon />
    </div>
  );
}
interface DataLayerEvent {
  event: string;
  insight_type?: string;
  insight_title?: string;
  insight_link?: string;
  insight_topics?: string;
}
function PrevNavigation(props: { onClick?: () => void }) {
  const { onClick } = props;
  return (
    <div
      className="w-[60px] h-[46px] bg-extralightPurple absolute z-[2] bottom-[-115px]  left-[85px] hover:brightness-75 hidden md:grid place-content-center cursor-pointer"
      onClick={onClick}
    >
      <RightNavigateIcon />
    </div>
  );
}

const RecentInsights = ({ fields, params }: RecentInsightsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const param = (params?.Styles as bgType) || 'bg-mainPurple';
  const [showMoreTopics, setShowMoreTopics] = useState(false);
  const [setPadding, setNewPadding] = useState(false);

  const handleDivClick = (type: string, title: string, link: string, topics: string) => {
    const eventData: DataLayerEvent = {
      event: 'more_insights_click',
      insight_type: type,
      insight_title: title,
      insight_link: link,
      insight_topics: topics,
    };
    window.dataLayer.push(eventData);
  };
  useEffect(() => {
    if (fields?.data?.datasource?.PageReferences?.targetItems.length === 1) {
      setNewPadding(true);
    }
  }, [fields?.data?.datasource?.PageReferences?.targetItems.length]);

  const { t } = useI18n();
  const hasValues =
    fields?.data?.datasource?.title?.jsonValue?.value ||
    fields?.data?.datasource?.description?.jsonValue?.value ||
    fields?.data?.datasource?.PageReferences?.targetItems.length;
  if (!hasValues) {
    return <></>;
  }
  const style = {
    testColor: 'text-white',
    fill: 'white',
  } as styleType;

  const showMore = () => {
    setShowMoreTopics(!showMoreTopics);
  };

  if (param === bgType.white) {
    style.testColor = 'text-black';
    style.fill = 'black';
  }
  return (
    <section className={`${param} pb-[49px] md:pb-[100px]`}>
      <div
        className={`${
          setPadding ? 'pb-[0px] md:pb-[0px]' : 'pb-[49px] md:pb-[113px]'
        } m-auto w-full pt-[59px] max-w-[1200px] 2xl:max-w-[1440px] md:pt-[103px] px-[1.375rem] lg:px-0`}
      >
        {fields?.data?.datasource?.title?.jsonValue?.value ||
        fields?.data?.datasource?.description?.jsonValue ? (
          <header className="grid grid-cols-12">
            <Text
              tag="h2"
              className={`col-span-12 ${
                fields?.data?.datasource?.description?.jsonValue.value && 'md:col-span-4'
              } text-[32px] md:text-[60px] font-gowlingBliss font-bold 
                ${style.testColor} tracking-[-0.64px] leading-normal md:tracking-[-1.2px] `}
              field={fields?.data?.datasource?.title?.jsonValue}
            />

            {fields?.data?.datasource?.title?.jsonValue?.value &&
              fields?.data?.datasource?.description?.jsonValue?.value && (
                <div className="col-span-12 md:col-span-1" />
              )}

            <JssRichText
              field={fields?.data?.datasource?.description?.jsonValue}
              className={`col-span-12 ${
                fields?.data?.datasource?.title?.jsonValue?.value && 'md:col-span-7'
              } ${
                style.testColor
              } font-arial font - normal text-[24px] md:mt-0 mt-[20px] leading-normal`}
            />
          </header>
        ) : null}

        {fields?.data?.datasource?.PageReferences?.targetItems.length > 0 ? (
          <div className="mb-[40px] mt-[50px] md:mb-[79px] md:mt-[103px] relative sector-react-slick-container">
            <Slider {...settings}>
              {fields?.data?.datasource?.PageReferences?.targetItems.map((page, index) => {
                return (
                  <div key={index}>
                    <a
                      onClick={() =>
                        handleDivClick(
                          page?.pageType?.targetItem?.pageType?.value,
                          page?.Title?.jsonValue?.value,
                          page?.url?.url,
                          page?.RelatedTopics?.targetItems
                            ?.map((topic) => topic?.Title?.jsonValue?.value)
                            .join(', ')
                        )
                      }
                      className="md:hover:drop-shadow-xl"
                      href={page?.url?.url}
                    >
                      <div className="grid grid-cols-12 ">
                        <div className="col-span-12 md:col-span-4">
                          <JssImage
                            className="h-auto w-full col-span-12 md:col-span-4 md:ml-6"
                            field={page?.Image?.jsonValue}
                          />
                        </div>

                        {page?.Image?.jsonValue?.value && (
                          <div className="col-span-12 md:col-span-1" />
                        )}
                        <div
                          className={`col-span-12 ${
                            page?.Image?.jsonValue?.value && 'md:col-span-7'
                          }`}
                        >
                          <div className="flex items-center gap-[10px] mt-[54px] md:mt-0">
                            <JssImage
                              className={param === bgType.white ? '' : 'brightness-0 invert'}
                              field={page?.pageType?.targetItem?.icon?.jsonValue}
                            />
                            <span
                              className={
                                param === bgType.white
                                  ? 'text-darkBlue font-bold'
                                  : 'text-white leading-normal font-bold'
                              }
                            >
                              {page?.pageType?.targetItem?.pageType?.value}
                            </span>

                            <div
                              className={`font-normal font - arial text-[10px] md:text-[16px] leading-[156%] ${style.testColor}`}
                            >
                              {page?.PublishedDate?.jsonValue?.value
                                ? newFormatDate(
                                    page?.PublishedDate?.jsonValue?.value,
                                    sitecoreContext.language as unknown as string
                                  )
                                : ''}
                            </div>
                          </div>

                          <Text
                            tag="h3"
                            className={`${style.testColor} font-bold font-gowlingBliss text-[32px] mt-[17px] tracking-[-0.64px] leading-normal`}
                            field={page?.Title?.jsonValue}
                          />
                          <JssRichText
                            field={{
                              ...page?.SubTitle?.jsonValue,
                              value: page?.SubTitle?.jsonValue?.value.slice(0, 300),
                            }}
                            className={`${style.testColor} font-normal font-arial mt-3 hidden md:block text-base leading-[156%]`}
                          />
                          <div className="hidden md:flex md:pl-[18px]  mt-[37px] gap-[18px] w-7/12 items-center">
                            {page?.RelatedTopics?.targetItems?.map((topic, index) => {
                              if (showMoreTopics && index > 2) return null;
                              return (
                                <a
                                  href={`/insight-resources?topic=${topic?.Title?.jsonValue?.value}`}
                                  key={index}
                                  className={`${style.testColor}  small-text leading-[140%] hover:font-bold`}
                                >
                                  {topic?.Title?.jsonValue?.value}
                                </a>
                              );
                            })}
                            {page?.RelatedTopics?.targetItems?.length > 3 && (
                              <button
                                className={`font-bold ${style.testColor} flex items-center`}
                                onClick={showMore}
                              >
                                <span className="leading-normal">{t('SeeAll')}</span>
                                <span>
                                  <DownIcon
                                    fill={`${style.fill}`}
                                    height="0.625rem"
                                    width="1.875rem"
                                  />
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </Slider>
          </div>
        ) : null}
      </div>
      {fields?.data?.datasource?.CTALink?.jsonValue?.value?.href && (
        <Link
          className="text-black text-[14px] md:mt-0 mt-[70px] hover:text-white md:mb-0 mb-[10px] tracking-[0.56px] leading-normal w-[142px] min-h-[60px] h-[60px] min-w-[142px] mx-auto bg-lightBlue hover:bg-darkBlue  flex justify-center items-center rounded-xxl font-bold text-center transition-all"
          field={fields?.data?.datasource?.CTALink?.jsonValue}
        />
      )}
    </section>
  );
};

export default withDatasourceCheck()<RecentInsightsProps>(RecentInsights);
