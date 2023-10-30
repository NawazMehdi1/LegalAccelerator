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
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const searchApiUrl = sitecoreContext?.SearchApiUrl as string;
  const { language, country } = useLanguageHook();
  const toprelatedInsights = fields?.data?.datasource?.RelatedInsights?.targetItems || [];
  const relatedInsights = toprelatedInsights.slice(0, 3);
  const searchSource = sitecoreContext?.SearchSource as string;
  const seeLink = `${fields?.data?.datasource?.SeeMore?.jsonValue?.value?.href}${
    fields?.data?.datasource?.SeeMore?.jsonValue?.value?.querystring.split('=')[0]
  }=${sitecoreContext?.route?.name}`;
  const FilterType = params?.FilterType;
  const [SearchSeeLink, setSearchSeeLink] = useState('');

  const { data } = useQuery({
    queryKey: ['RelatedInsights'],
    queryFn: () => {
      if (relatedInsights.length === 0) {
        if (FilterType === 'PageContextFilter') {
          const categoryType = fields?.data?.datasource?.SeeMore?.jsonValue?.value?.querystring
            .split('=')[0]
            .substring(1);
          const filterValue = sitecoreContext?.route?.name;
          return RelatedInsightPageFilterQueryFn(searchApiUrl, {
            searchSource,
            language,
            country,
            FilterValue: filterValue,
            categoryFilter: categoryType,
          });
        }
        if (FilterType === 'SearchFilter') {
          const jurisdictions =
            fields?.data?.contextItem?.Jurisdictions?.targetItems
              ?.map((item) => item.title?.jsonValue?.value)
              .filter(Boolean) || [];
          const services =
            fields?.data?.contextItem?.Services?.targetItems
              ?.map((item) => item.title?.jsonValue?.value)
              .filter(Boolean) || [];
          const sectors =
            fields?.data?.contextItem?.Sectors?.targetItems
              ?.map((item) => item.title?.jsonValue?.value)
              .filter(Boolean) || [];
          const queryParts = [];
          if (jurisdictions.length > 0) {
            queryParts.push(`jurisdictions=${jurisdictions.join(',')}`);
          }
          if (services.length > 0) {
            queryParts.push(`services=${services.join(',')}`);
          }
          if (sectors.length > 0) {
            queryParts.push(`sectors=${sectors.join(',')}`);
          }
          const category =
            fields?.data?.contextItem?.CategoryType?.targetItem?.type?.jsonValue?.value;
          const pagetype =
            category === 'Insights'
              ? fields?.data?.contextItem?.PageType?.targetItem?.type?.jsonValue?.value
              : '';
          const querystring = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
          const newSearchSeeLink = `${fields?.data?.datasource?.SeeMore?.jsonValue?.value?.href}${querystring}`;
          setSearchSeeLink(newSearchSeeLink);
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
      }
      // Return a placeholder value if none of the conditions are met
      return { widgets: [] };
    },
  });

  const toprelatedFilterInsights = data?.widgets?.[0]?.content || [];
  const relatedFilterInsights = toprelatedFilterInsights.slice(0, 3);
  if (!relatedInsights.length && !relatedFilterInsights.length) {
    return null;
  }

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

  const shouldShowSeeMore = toprelatedFilterInsights.length > 3 || toprelatedInsights.length > 3;
  return (
    <>
      <div className="my-[5.031rem] md:mt-[5.75rem] md:mb-[5.125rem]">
        <p className="text-black text-[2rem] px-[1.188rem] mb-[1.875rem] md:mb-[3.75rem] md:px-[6.25rem] font-bold font-gowlingBliss md:text-[3rem]">
          {t('RelatedInsights')}
        </p>

        <div className="md:hidden md:px-[1.875rem] related-insight-slick-container lg:pr-[6.188rem] lg:pl-[6.313rem]">
          {relatedInsights.length > 0 ? (
            <div className={`grid gap-5 grid-cols-1`}>
              <Slider {...settings}>
                {relatedInsights?.map((relatedInsight, index) => {
                  const publishedDate = relatedInsight?.PublishedDate?.jsonValue?.value;
                  const formatedDate = newFormatDate(
                    publishedDate,
                    sitecoreContext?.language as unknown as string
                  );
                  return (
                    <div key={index} className="mt-[2.5rem]">
                      <Link href={relatedInsight?.url?.path}>
                        <div className="h-full bg-white pb-[1.75rem] hover:shadow-custom mx-[1.25rem] md:mx-0">
                          <JssImage
                            className="col-span-12 w-full md:mr-4 md:col-span-4 md:h-[8.063rem] lg:h-[11.25rem] xl:h-[16.188rem]"
                            field={relatedInsight?.Image?.jsonValue}
                          />
                          <div className="flex gap-[0.625rem] my-[1.25rem] items-center">
                            <JssImage
                              className="w-auto col-span-12x md:col-span-4 h-auto"
                              field={relatedInsight?.pageType?.targetItem?.icon?.jsonValue}
                            />

                            <p className="font-bold text-[1rem] text-darkBlue leading-normal">
                              {relatedInsight?.pageType?.targetItem?.pageType?.value}
                            </p>
                            {formatedDate === '' || null ? (
                              ''
                            ) : (
                              <>
                                <span className="flex items-center text-[0.625rem] leading-normal mr-[-0.313rem]">
                                  {t('Published')}
                                </span>
                                <p className="font-normal text-[0.625rem] text-black">
                                  {formatedDate}
                                </p>
                              </>
                            )}
                          </div>

                          <p className="text-[1.5rem] font-bold text-black leading-normal">
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
                    <div key={index} className="mt-[2.5rem]">
                      <Link href={relatedInsight?.url}>
                        <div className="bg-white h-full hover:shadow-custom pb-[1.75rem] mx-[1.25rem] md:mx-0">
                          <img
                            className="col-span-12 w-full md:col-span-4 md:mr-4 md:h-[8.063rem] lg:h-[11.25rem] xl:h-[16.188rem]"
                            src={relatedInsight?.image_url}
                            alt={relatedInsight?.name}
                          />
                          <div className="flex gap-[0.625rem] items-center mt-[1.25rem] mb-[0.875rem]">
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
                                <span className="flex leading-normal items-center mr-[-0.313rem] text-[0.625rem]">
                                  {t('Published')}
                                </span>
                                <p className="text-black font-normal text-[0.625rem]">
                                  {formatedDate}
                                </p>
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

        <div className="hidden md:block px-[1.875rem] lg:pl-[6.313rem] lg:pr-[6.188rem]">
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
                  <div key={index} className="mb-[2.5rem]">
                    <Link href={relatedInsight?.url?.path}>
                      <div className="bg-white pb-[2.75rem] h-full hover:shadow-custom">
                        <JssImage
                          className="col-span-12 w-full md:mr-4 md:col-span-4 md:h-[8.063rem] lg:h-[11.25rem] xl:h-[16.188rem]"
                          field={relatedInsight?.Image?.jsonValue}
                        />
                        <div className="flex gap-[0.625rem] mt-[1.25rem] mb-[0.875rem] items-center">
                          <JssImage
                            className="col-span-12 w-auto h-auto md:col-span-4"
                            field={relatedInsight?.pageType?.targetItem?.icon?.jsonValue}
                          />

                          <p className="text-darkBlue font-bold max-w-[10rem] text-[1rem] leading-normal">
                            {relatedInsight?.pageType?.targetItem?.pageType?.value}
                          </p>
                          {formatedDate === '' || null ? (
                            ''
                          ) : (
                            <>
                              <span className="text-[0.625rem] flex leading-normal items-center mr-[-0.313rem]">
                                {t('Published')}
                              </span>
                              <p className="text-[0.625rem] text-black font-normal">
                                {formatedDate}
                              </p>
                            </>
                          )}
                        </div>

                        <p className="text-[1.5rem] font-bold text-black pr-[1.688rem] leading-normal">
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
                relatedFilterInsights.length === 1 ? '1' : relatedInsights.length === 2 ? '2' : '3'
              } gap-5`}
            >
              {relatedFilterInsights?.map((relatedInsight, index) => {
                const publishedDate = relatedInsight?.published_date;
                const formatedDate = newFormatDate(
                  publishedDate,
                  sitecoreContext?.language as unknown as string
                );
                return (
                  <div key={index} className="mb-[2.5rem]">
                    <Link href={relatedInsight?.url}>
                      <div className="bg-white h-full hover:shadow-custom pb-[2.75rem]">
                        <img
                          className="col-span-12 w-full md:col-span-4 md:mr-4 md:h-[8.063rem] lg:h-[11.25rem] xl:h-[16.188rem]"
                          src={relatedInsight?.image_url}
                          alt={relatedInsight?.name}
                        />
                        <div className="flex gap-[0.625rem] items-center mt-[1.25rem] mb-[0.875rem]">
                          <img
                            className="col-span-12 h-auto w-auto md:col-span-4"
                            src={relatedInsight?.page_type_icon}
                            alt={relatedInsight?.page_type}
                          />

                          <p className="text-darkBlue font-bold text-[1rem] leading-normal max-w-[10rem]">
                            {relatedInsight?.page_type}
                          </p>
                          {formatedDate === '' || null ? (
                            ''
                          ) : (
                            <>
                              <span className="flex leading-normal items-center mr-[-0.313rem] text-[0.625rem]">
                                {t('Published')}
                              </span>
                              <p className="text-black font-normal text-[0.625rem]">
                                {formatedDate}
                              </p>
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
        {shouldShowSeeMore && fields?.data?.datasource?.SeeMore?.jsonValue?.value?.href && (
          <p className="justify-center text-center mb-[5.125rem] mx-[1.25rem] md:mt-[2.563rem]">
            <a
              href={FilterType === 'SearchFilter' ? SearchSeeLink : seeLink}
              className="text-[0.875rem] bg-lightBlue font-bold rounded-full block md:inline px-[2.875rem] py-[1.375rem]"
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
