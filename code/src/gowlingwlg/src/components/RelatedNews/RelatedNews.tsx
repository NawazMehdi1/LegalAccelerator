import { Field, Link, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useLanguageHook from 'core/hooks/useLanguageHook';
import dynamic from 'next/dynamic';
import RelatedNewsQueryFn from 'core/api/queries/RelatedNewsQueryFn';
import { newFormatDate } from 'core/utils/formatDate';

type jsonValueType = {
  querystring: string;
  href: string;
  anchor: string;
  linktype: string;
  title: string;
  target: string;
  class: string;
  text: string;
};

export type RelatedTopicsProps = ComponentProps & {
  fields: {
    data: {
      searchCategoryType: {
        type: Field<string>;
      };
      datasource: {
        SeeMore?: {
          jsonValue?: {
            value?: jsonValueType;
          };
        };
      };
    };
  };
};

export interface Widgets {
  widgets: {
    total_item: number;
    content: Array<RelatedNews>;
  }[];
}

type RelatedNews = {
  date: string;
  name: string;
  type: string;
  value: string;
  content_type_icon: string;
  published_date: string;
  page_type: string;
  url: string;
};
interface RouteFields {
  [key: string]: unknown;
  Title: Field<string>;
}

const RelatedNews = (props: RelatedTopicsProps) => {
  const { t } = useI18n();
  const { language, country } = useLanguageHook();
  const { sitecoreContext } = useSitecoreContext();
  const [RelatedNews, setRelatedNews] = useState<RelatedNews[]>([]);
  const numRelatedNews = RelatedNews.length;
  const searchApiUrl = sitecoreContext?.SearchApiUrl as string;
  const searchCategoryType = props?.fields?.data?.searchCategoryType?.type?.value;
  const searchSource = sitecoreContext?.SearchSource as string;
  const fields = sitecoreContext?.route?.fields as RouteFields;
  const searchServiceName = fields?.Title?.value as string;
  const prettyQuerystring = (
    props?.fields?.data?.datasource?.SeeMore?.jsonValue?.value?.querystring || ''
  )
    .replace('?', '')
    .replace('={0}', '');
  const serviceName = prettyQuerystring;
  const { data } = useQuery({
    queryKey: ['RelatedNews', { searchCategoryType, searchServiceName }],

    queryFn: () =>
      RelatedNewsQueryFn(searchApiUrl, {
        searchSource,
        searchServiceName,
        serviceName,
        searchCategoryType,
        language,
        country,
      }),
  });

  const Slider = dynamic(() => import('react-slick').then((m) => m.default), {
    ssr: false,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  useEffect(() => {
    if (data?.widgets?.[0]?.content) {
      setRelatedNews(data?.widgets?.[0]?.content);
    } else {
      setRelatedNews([]);
    }
  }, [data]);
  const shouldRenderSeeMoreButton = numRelatedNews >= 3;
  console.log('searchCategoryType', searchCategoryType);

  if (RelatedNews?.length === 0) {
    return <></>;
  }
  return (
    <>
      <div className="my-[80.5px] md:mt-[92px] md:mb-[5.125rem] p-[1.313rem] md:p-0 max-w-[1200px] 2xl:max-w-[1440px] m-auto">
        <p className=" mb-[2.313rem] md:mb-[40px] font-bold font-gowlingBliss text-black text-[32px] md:text-[48px] tracking-[-0.06rem]">
          {t('RelatedNews')}
        </p>

        <div className="hidden md:block">
          <div
            className={`grid grid-cols-${
              RelatedNews.length === 1 ? '1' : RelatedNews.length === 2 ? '2' : '3'
            } gap-4`}
          >
            {RelatedNews?.map((RelatedNews, index) => {
              return (
                <div key={index} className="mb-[40px]">
                  <a href={RelatedNews?.url} className="h-full block">
                    <div className="h-full bg-lightGrey hover:shadow-custom pl-[30px] pr-[27px] pt-[40px] pb-[45px]">
                      <div className="flex mb-[20px]">
                        <img
                          src={RelatedNews?.content_type_icon}
                          alt="image"
                          className="mr-[11px]"
                        />

                        <p className="mr-[11px] text-darkBlue font-bold text-[16px]">
                          {RelatedNews?.type}
                        </p>

                        <p className="text-black font-normal text-[16px]">
                          {newFormatDate(RelatedNews?.published_date, 'en-US')}
                        </p>
                      </div>

                      <p className="text-[24px] font-bold text-black">{RelatedNews?.name}</p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden related-news contentcards-react-slick-container">
          <Slider {...settings}>
            {RelatedNews?.map((RelatedNews, index) => {
              return (
                <div key={index} className="">
                  <div className="bg-lightGrey h-[246px]  pt-[40px] pl-[30px] pb-[30px] pr-[59px]">
                    <div className="flex mb-[20px] md:mb-[30px]">
                      <div className="w-26.59 mr-[11px] ">
                        <img src={RelatedNews?.content_type_icon} alt="image" className="" />
                      </div>

                      <p className="mr-[11px] text-darkBlue font-bold text-[16px]">
                        {RelatedNews?.type}
                      </p>

                      <p className="text-black font-normal text-[16px]">
                        {newFormatDate(RelatedNews?.published_date, 'en-US')}
                      </p>
                    </div>

                    <p className="text-black font-bold text-left text-[24px]">
                      {RelatedNews?.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

        <div className="flex items-center justify-center">
          {shouldRenderSeeMoreButton && (
            <Link
              field={{
                text: props?.fields?.data?.datasource?.SeeMore?.jsonValue?.value?.text,
                href: props?.fields?.data?.datasource?.SeeMore?.jsonValue?.value?.href,
                querystring:
                  props?.fields?.data?.datasource?.SeeMore?.jsonValue?.value?.querystring
                    ?.replace('{0}', searchServiceName)
                    .replace('?', '') || '',
              }}
              className="bg-darkBlue hover:bg-[#106597] mt-[42px] text-[14px] font-bold leading-normal tracking-[0.56px] flex items-center justify-center text-white  rounded-[100px] md:w-[159px] h-[60px]"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RelatedNews;
