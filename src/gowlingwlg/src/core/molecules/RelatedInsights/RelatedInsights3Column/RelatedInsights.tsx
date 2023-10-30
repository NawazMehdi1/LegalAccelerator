import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSitecoreContext, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { newFormatDate } from 'core/utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import useLanguageHook from 'core/hooks/useLanguageHook';
import Link from 'next/link';
import { RelatedInsightsProps } from '../RelatedInsights.types';
import RelatedInsightSearchFilterQueryFn from 'core/api/queries/RelatedInsightSearchFilterQueryFn';
import RelatedInsightPageFilterQueryFn from 'core/api/queries/RelatedInsightPageFilterQueryFn';

const RelatedInsights = ({ fields, params }: RelatedInsightsProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const { t } = useI18n();
  const { language, country } = useLanguageHook();
  const toprelatedInsights = fields?.data?.datasource?.RelatedInsights?.targetItems || [];
  const relatedInsights = toprelatedInsights.slice(0, 3);
  const [SearchSeeLink, setSearchSeeLink] = useState('');
  const seeLink = `${fields?.data?.datasource?.SeeMore?.jsonValue?.value?.href}${
    fields?.data?.datasource?.SeeMore?.jsonValue?.value?.querystring.split('=')[0]
  }=${sitecoreContext?.route?.name}`;
  const searchApiUrl = sitecoreContext?.SearchApiUrl as string;
  const FilterType = params?.FilterType;
  const searchSource = sitecoreContext?.SearchSource as string;

  const { data } = useQuery({
    queryKey: ['RelatedInsights'],
    queryFn: () => {
      if (relatedInsights.length === 0) {
        if (FilterType === 'SearchFilter') {
          // Perform the SearchFilter query
          const services =
            fields?.data?.contextItem?.Services?.targetItems
              ?.map((item) => item.title?.jsonValue?.value)
              .filter(Boolean) || [];
          const sectors =
            fields?.data?.contextItem?.Sectors?.targetItems
              ?.map((item) => item.title?.jsonValue?.value)
              .filter(Boolean) || [];
          const jurisdictions =
            fields?.data?.contextItem?.Jurisdictions?.targetItems
              ?.map((item) => item.title?.jsonValue?.value)
              .filter(Boolean) || [];
          const queryParts = [];
          if (services.length > 0) {
            queryParts.push(`services=${services.join(',')}`);
          }
          if (sectors.length > 0) {
            queryParts.push(`sectors=${sectors.join(',')}`);
          }
          if (jurisdictions.length > 0) {
            queryParts.push(`jurisdictions=${jurisdictions.join(',')}`);
          }
          const querystring = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
          const newSearchSeeLink = `${fields?.data?.datasource?.SeeMore?.jsonValue?.value?.href}${querystring}`;
          setSearchSeeLink(newSearchSeeLink);
          const category =
            fields?.data?.contextItem?.CategoryType?.targetItem?.type?.jsonValue?.value;
          const pagetype =
            category === 'Insights'
              ? fields?.data?.contextItem?.PageType?.targetItem?.type?.jsonValue?.value
              : '';
          return RelatedInsightSearchFilterQueryFn(searchApiUrl, {
            searchSource,
            language,
            country,
            category: category,
            pagetype: pagetype,
            services: services || [],
            sectors: sectors || [],
            jurisdictions: jurisdictions || [],
          });
        }
        if (FilterType === 'PageContextFilter') {
          const filterValue = sitecoreContext?.route?.name;
          const categoryType = fields?.data?.datasource?.SeeMore?.jsonValue?.value?.querystring
            .split('=')[0]
            .substring(1);
          return RelatedInsightPageFilterQueryFn(searchApiUrl, {
            searchSource,
            language,
            country,
            categoryFilter: categoryType,
            FilterValue: filterValue,
          });
        }
      }
      // Return a placeholder value if none of the conditions are met
      return { widgets: [] };
    },
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
  const toprelatedFilterInsights = data?.widgets?.[0]?.content || [];
  const relatedFilterInsights = toprelatedFilterInsights.slice(0, 3);
  const shouldShowSeeMore = toprelatedFilterInsights.length > 3 || toprelatedInsights.length > 3;
  if (!relatedInsights.length && !relatedFilterInsights.length) {
    return null;
  }
  return (
    <>
      <div className="my-[5.031rem] md:mb-[5.125rem] md:mt-[5.75rem]">
        <p className="font-bold font-gowlingBliss mb-[1.875rem] px-[1.188rem] md:mb-[2.5rem] md:px-[6.25rem] text-black text-[2rem] md:text-[3rem]">
          {t('RelatedInsights')}
        </p>

        <div className="px-[30px] hidden md:block lg:pl-[101px] lg:pr-[99px]">
          {relatedInsights.length > 0 ? (
            <div
              className={`grid grid-cols-${
                relatedInsights.length === 1 ? '1' : relatedInsights.length === 2 ? '2' : '3'
              } gap-5`}
            >
              {relatedInsights?.map((relatedInsight, index) => {
                const publishedDate = relatedInsight?.PublishedDate?.jsonValue?.value;
                const formatedDate = newFormatDate(
                  publishedDate,
                  sitecoreContext?.language as unknown as string
                );
                return (
                  <div key={index} className="mb-[40px]">
                    <Link href={relatedInsight?.url?.path}>
                      <div className="bg-lightGrey pl-[1.875rem] pr-[1.688rem] h-full pt-[2.5rem] pb-[2.75rem] hover:shadow-custom">
                        <div className="flex items-center gap-3 mb-[1.25rem] pr-[1.688rem] ">
                          <JssImage
                            className="h-auto w-auto col-span-12 md:col-span-4"
                            field={relatedInsight?.pageType?.targetItem?.icon?.jsonValue}
                          />

                          <p className="font-bold text-[1rem] text-darkBlue leading-normal">
                            {relatedInsight?.pageType?.targetItem?.pageType?.value}
                          </p>
                          {formatedDate === '' || null ? (
                            ''
                          ) : (
                            <>
                              {/* <span className="flex leading-normal items-center mr-[-10px] text-[10px]">
                              {t('Published')}
                            </span> */}
                              <p className="text-[1rem] text-black font-normal">{formatedDate}</p>
                            </>
                          )}
                        </div>

                        <p className="font-bold text-black text-[1.5rem] pr-[1.688rem] leading-normal">
                          {relatedInsight?.Title?.jsonValue?.value}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`grid grid-cols-${
                relatedFilterInsights.length === 1
                  ? '1'
                  : relatedFilterInsights.length === 2
                  ? '2'
                  : '3'
              } gap-5`}
            >
              {relatedFilterInsights?.map((relatedInsight, index) => {
                const publishedDate = relatedInsight?.published_date;
                const formatedDate = newFormatDate(
                  publishedDate,
                  sitecoreContext?.language as unknown as string
                );
                return (
                  <div key={index} className="mb-[40px]">
                    <Link href={relatedInsight?.url}>
                      <div className="bg-lightGrey h-full hover:shadow-custom pl-[1.875rem] pr-[1.688rem] pt-[2.5rem] pb-[2.75rem]">
                        <div className="flex gap-3 items-center mb-[1.25rem] pr-[1.688rem] ">
                          <img
                            className="col-span-12 h-auto w-auto md:col-span-4"
                            src={relatedInsight?.page_type_icon}
                            alt={relatedInsight?.page_type}
                          />

                          <p className="text-darkBlue font-bold text-[1rem] leading-normal">
                            {relatedInsight?.page_type}
                          </p>
                          {formatedDate === '' || null ? (
                            ''
                          ) : (
                            <>
                              {/* <span className="flex leading-normal items-center mr-[-10px] text-[10px]">
                              {t('Published')}
                            </span> */}
                              <p className="text-black font-normal text-[1rem]">{formatedDate}</p>
                            </>
                          )}
                        </div>

                        <p className="text-[1.5rem] pr-[1.688rem] leading-normal font-bold text-black">
                          {relatedInsight?.name}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="related-insight-slick-container md:hidden md:px-[1.875rem] lg:pl-[6.313rem] lg:pr-[6.188rem]">
          {relatedInsights.length > 0 ? (
            <div className={`grid grid-cols-1 gap-5`}>
              <Slider {...settings}>
                {relatedInsights?.map((relatedInsight, index) => {
                  const publishedDate = relatedInsight?.PublishedDate?.jsonValue?.value;
                  const formatedDate = newFormatDate(
                    publishedDate,
                    sitecoreContext?.language as unknown as string
                  );
                  return (
                    <div key={index}>
                      <Link href={relatedInsight?.url?.path}>
                        <div className="bg-lightGrey h-full hover:shadow-custom pl-[1.875rem] pr-[1.125rem] pt-[2.5rem] pb-[1.75rem] mx-[1.25rem] md:mx-0">
                          <div className="flex gap-3 items-center mb-[1.25rem]">
                            <JssImage
                              className="col-span-12 h-auto w-auto md:col-span-4"
                              field={relatedInsight?.pageType?.targetItem?.icon?.jsonValue}
                            />

                            <p className="text-darkBlue font-bold text-[1rem] leading-normal w-auto">
                              {relatedInsight?.pageType?.targetItem?.pageType?.value}
                            </p>
                            {formatedDate === '' || null ? (
                              ''
                            ) : (
                              <>
                                {/* <span className="flex leading-normal items-center mr-[-10px] text-[10px]">
                              {t('Published')}
                            </span> */}
                                <p className="text-black font-normal text-[1rem]">{formatedDate}</p>
                              </>
                            )}
                          </div>

                          <p className="text-[1.5rem] leading-normal font-bold text-black">
                            {relatedInsight?.Title?.jsonValue?.value}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </Slider>
            </div>
          ) : (
            <div className={`grid grid-cols-1 gap-5`}>
              <Slider {...settings}>
                {relatedFilterInsights?.map((relatedInsight, index) => {
                  const publishedDate = relatedInsight?.published_date;
                  const formatedDate = newFormatDate(
                    publishedDate,
                    sitecoreContext?.language as unknown as string
                  );
                  return (
                    <div key={index}>
                      <Link href={relatedInsight?.url}>
                        <div className="bg-lightGrey h-full hover:shadow-custom pl-[1.875rem] pr-[1.125rem] pt-[2.5rem] pb-[1.75rem] mx-[1.25rem] md:mx-0">
                          <div className="flex gap-3 items-center mb-[1.25rem]">
                            <img
                              className="col-span-12 h-auto w-auto md:col-span-4"
                              src={relatedInsight?.page_type_icon}
                              alt={relatedInsight?.page_type}
                            />

                            <p className="text-darkBlue font-bold text-[1rem] leading-normal w-auto">
                              {relatedInsight?.page_type}
                            </p>
                            {formatedDate === '' || null ? (
                              ''
                            ) : (
                              <>
                                {/* <span className="flex leading-normal items-center mr-[-10px] text-[10px]">
                              {t('Published')}
                            </span> */}
                                <p className="text-black font-normal text-[1rem]">{formatedDate}</p>
                              </>
                            )}
                          </div>

                          <p className="text-[1.5rem] leading-normal font-bold text-black">
                            {relatedInsight?.name}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </Slider>
            </div>
          )}
        </div>

        {shouldShowSeeMore && fields?.data?.datasource?.SeeMore?.jsonValue?.value?.href && (
          <p className="justify-center text-center mx-[1.25rem] md:mt-[2.563rem] mb-[5.125rem] flex">
            <a
              href={FilterType === 'SearchFilter' ? SearchSeeLink : seeLink}
              className="text-[0.875rem] bg-lightBlue block rounded-full md:inline px-[2.875rem] py-[1.375rem] font-bold "
            >
              {fields?.data?.datasource?.SeeMore.jsonValue.value.text}
            </a>
          </p>
        )}
      </div>
    </>
  );
};

export default RelatedInsights;
