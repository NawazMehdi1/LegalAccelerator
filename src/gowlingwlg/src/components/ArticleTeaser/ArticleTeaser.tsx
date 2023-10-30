import {
  Text,
  withDatasourceCheck,
  Image as JssImage,
  RichText as JssRichText,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ArticleTeaserProps, bgType, styleType } from './articleTeaser.types';
import LeftNavigateIcon from 'core/atoms/Icons/LeftNavigateIcon';
import RightNavigateIcon from 'core/atoms/Icons/RightNavigateIcon';
import DownIcon from 'core/atoms/Icons/DownIcon';
import dynamic from 'next/dynamic';
import { useI18n } from 'next-localization';
import { useState } from 'react';

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
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function NextNavigation(props: { onClick?: () => void }) {
  const { onClick } = props;
  return (
    <div
      className="w-[60px] h-[46px] z-[2] bg-maroon hover:brightness-75  absolute bottom-[-120px] hidden md:grid place-content-center cursor-pointer"
      onClick={onClick}
    >
      <LeftNavigateIcon />
    </div>
  );
}

function PrevNavigation(props: { onClick?: () => void }) {
  const { onClick } = props;
  return (
    <div
      className="w-[60px] h-[46px] bg-lightPurple absolute z-[2] bottom-[-120px]  left-[85px] hover:brightness-75 hidden md:grid place-content-center cursor-pointer"
      onClick={onClick}
    >
      <RightNavigateIcon />
    </div>
  );
}

const ArticleTeaser = ({ fields, params }: ArticleTeaserProps): JSX.Element => {
  const { t } = useI18n();
  const [showMoreTopics, setShowMoreTopics] = useState(false);
  const param = (params?.Styles as bgType) || 'bg-mainPurple';
  const style = {
    testColor: 'text-white',
    fill: 'white',
  } as styleType;

  if (param === bgType.white) {
    style.testColor = 'text-black';
    style.fill = 'white';
  }
  const showMore = () => {
    setShowMoreTopics(!showMoreTopics);
  };
  const hasValues =
    fields?.data?.datasource?.title?.jsonValue?.value ||
    fields?.data?.datasource?.description?.jsonValue?.value ||
    fields?.data?.datasource?.pageReferences?.targetItems.length;

  if (!hasValues) {
    return <></>;
  }

  const dataFormater = (inputData: string) => {
    const date: Date | undefined = inputData ? new Date(inputData) : undefined;
    const prettyDate = date?.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return prettyDate;
  };

  return (
    <div className={`${param} pb-[49px] md:pb-[100px]`}>
      <div
        className={`p-[20px] max-w-[1200px] 2xl:max-w-[1440px] m-auto w-full pt-[59px] md:pt-[103px] pb-[49px] md:pb-[113px] md:mb-[46px]`}
      >
        {fields?.data?.datasource?.title?.jsonValue?.value ||
        fields?.data?.datasource?.description?.jsonValue ? (
          <div className="grid grid-cols-12">
            <Text
              tag="h2"
              className={`col-span-12 ${
                fields?.data?.datasource?.description?.jsonValue.value && 'md:col-span-4'
              } text-[32px] md:text-[60px] font-gowlingBliss font-bold ${
                style.testColor
              } leading-normal tracking-[-0.64px] md:tracking-[-1.2px] `}
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
              } ${style.testColor} font-arial text-[24px] mt-2 md:mt-0  font-normal leading-normal`}
            />
          </div>
        ) : null}
        {fields?.data?.datasource?.pageReferences?.targetItems.length > 0 ? (
          <div className="pb-[30px] mt-[50px] md:mt-[103px] relative  sector-react-slick-container">
            <Slider {...settings}>
              {fields?.data?.datasource?.pageReferences?.targetItems.map((page, index) => {
                return (
                  <div key={index}>
                    <div className="grid grid-cols-12 ">
                      <JssImage
                        className="h-full w-full col-span-12 md:col-span-4 md:ml-6"
                        field={page?.image?.jsonValue}
                      />

                      {page?.image?.jsonValue?.value && (
                        <div className="col-span-12 md:col-span-1" />
                      )}

                      <div
                        className={`col-span-12 ${
                          page?.image?.jsonValue?.value && 'md:col-span-7'
                        }`}
                      >
                        <div className="flex mt-[54px] md:mt-0 items-center gap-[10px]">
                          <JssImage field={page?.pageType?.targetItem?.icon?.jsonValue} />
                          <span
                            className={
                              param === bgType.white
                                ? 'text-darkBlue'
                                : 'text-white font-bold leading-normal'
                            }
                          >
                            {page?.pageType?.targetItem?.pageType?.value}
                          </span>

                          <div
                            className={`font-normal text-[10px] font-arial leading-[140%] ${style.testColor}`}
                          >
                            {dataFormater(page?.publishedDate?.jsonValue?.value)}
                          </div>
                        </div>

                        <Text
                          tag="h3"
                          className={`${style.testColor} text-[32px] mt-[17px] tracking-[-0.64px] font-bold font-gowlingBliss leading-normal`}
                          field={page?.title?.jsonValue}
                        />

                        <JssRichText
                          field={page?.summary?.jsonValue}
                          className={`${style.testColor} mt-3 hidden md:block text-base font-normal font-arial  leading-[156%]`}
                        />
                        <div className="hidden md:flex gap-[18px] items-center mt-[31px]">
                          {page?.relatedTopics?.targetItems?.map((topic, index) => {
                            if (showMoreTopics && index > 2) return null;
                            return (
                              <button
                                key={`${index}-article-teaser`}
                                className={`${style.testColor}  small-text leading-[140%]`}
                              >
                                {topic?.title?.jsonValue?.value}
                              </button>
                            );
                          })}

                          <button
                            className={`font-bold ${style.testColor} flex items-center w-[100px]`}
                            onClick={showMore}
                          >
                            <span className="leading-normal">{t('SeeAll')}</span>
                            <span>
                              <DownIcon fill={`${style.fill}`} />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        ) : null}
      </div>
      <Link
        className="text-black text-[14px] md:mt-0 mt-[70px] md:mb-0 mb-[10px] tracking-[0.56px] leading-normal w-[142px] min-h-[60px] h-[60px] min-w-[142px] mx-auto bg-lightBlue flex justify-center items-center rounded-xxl font-bold text-center"
        field={fields?.data?.datasource?.cTALink?.jsonValue}
      />
    </div>
  );
};

export default withDatasourceCheck()<ArticleTeaserProps>(ArticleTeaser);
