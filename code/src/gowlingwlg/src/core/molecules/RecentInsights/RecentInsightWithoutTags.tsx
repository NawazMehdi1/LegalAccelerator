import {
  Text,
  withDatasourceCheck,
  Image as JssImage,
  RichText as JssRichText,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { RecentInsightsProps, bgType, styleType } from './RecentInsightsTypes';
import LeftNavigateIcon from 'core/atoms/Icons/LeftNavigateIcon';
import RightNavigateIcon from 'core/atoms/Icons/RightNavigateIcon';
import dynamic from 'next/dynamic';
import { newFormatDate } from 'core/utils/formatDate';
import { useEffect, useState } from 'react';

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

const RecentInsights = ({ fields, params }: RecentInsightsProps): JSX.Element => {
  const param = (params?.Styles as bgType) || 'bg-mainPurple';
  const [setPadding, setNewPadding] = useState(false);

  useEffect(() => {
    if (fields?.data?.datasource?.PageReferences?.targetItems.length === 1) {
      setNewPadding(true);
    }
  }, [fields?.data?.datasource?.PageReferences?.targetItems.length]);

  const style = {
    testColor: 'text-white',
    fill: 'white',
  } as styleType;

  if (param === bgType.white) {
    style.testColor = 'text-black';
    style.fill = 'black';
  }
  const hasValues =
    fields?.data?.datasource?.title?.jsonValue?.value ||
    fields?.data?.datasource?.description?.jsonValue?.value ||
    fields?.data?.datasource?.PageReferences?.targetItems.length;

  if (!hasValues) {
    return <></>;
  }
  return (
    <div className={`${param} pb-[49px] md:pb-[100px]`}>
      <div
        className={`max-w-[1200px] 2xl:max-w-[1440px] m-auto w-full pt-[59px] md:pt-[103px]  px-[1.375rem] lg:px-0 ${
          setPadding ? 'pb-[0px] md:pb-[0px]' : 'pb-[49px] md:pb-[113px]'
        }`}
      >
        {fields?.data?.datasource?.title?.jsonValue?.value ||
        fields?.data?.datasource?.description?.jsonValue ? (
          <div className="grid grid-cols-12">
            <Text
              tag="h2"
              className={`col-span-12 ${
                fields?.data?.datasource?.description?.jsonValue.value && 'md:col-span-4'
              } text-[32px] md:text-[60px] font-gowlingBliss font-bold 
                ${style.testColor} leading-normal tracking-[-0.64px] md:tracking-[-1.2px] `}
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
              } font-arial text-[24px] mt-[20px] md:mt-0  font-normal leading-normal`}
            />
          </div>
        ) : null}
        {fields?.data?.datasource?.PageReferences?.targetItems.length > 0 ? (
          <div className="mb-[40px] md:mb-[79px] mt-[50px] md:mt-[103px] relative  sector-react-slick-container">
            <Slider {...settings}>
              {fields?.data?.datasource?.PageReferences?.targetItems.map((page, index) => {
                return (
                  <div key={index}>
                    <a className="md:hover:drop-shadow-xl" href={page?.url?.url}>
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
                          <div className="flex mt-[54px] md:mt-0 items-center gap-[10px]">
                            <JssImage
                              className={param === bgType.white ? '' : 'brightness-0 invert'}
                              field={page?.pageType?.targetItem?.icon?.jsonValue}
                            />
                            <span
                              className={
                                param === bgType.white
                                  ? 'text-darkBlue font-bold'
                                  : 'text-white font-bold leading-normal'
                              }
                            >
                              {page?.pageType?.targetItem?.pageType?.value}
                            </span>

                            <div
                              className={`font-normal text-[10px] md:text-[16px] font-arial leading-[156%] ${style.testColor}`}
                            >
                              {newFormatDate(page?.PublishedDate?.jsonValue?.value, 'en-US')}
                            </div>
                          </div>

                          <Text
                            tag="h3"
                            className={`${style.testColor} text-[32px] mt-[17px] tracking-[-0.64px] font-bold font-gowlingBliss leading-normal`}
                            field={page?.Title?.jsonValue}
                          />

                          <JssRichText
                            field={{
                              ...page?.SubTitle?.jsonValue,
                              value: page?.SubTitle?.jsonValue?.value.slice(0, 300),
                            }}
                            className={`${style.testColor} mt-3 hidden md:block text-base font-normal font-arial  leading-[156%]`}
                          />
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
          className="text-black text-[14px] md:mt-0 mt-[70px] md:mb-0 mb-[10px] tracking-[0.56px] leading-normal w-[142px] min-h-[60px] h-[60px] min-w-[142px] mx-auto bg-lightBlue flex justify-center items-center rounded-xxl hover:bg-darkBlue hover:text-white font-bold text-center"
          field={fields?.data?.datasource?.CTALink?.jsonValue}
        />
      )}
    </div>
  );
};

export default withDatasourceCheck()<RecentInsightsProps>(RecentInsights);
