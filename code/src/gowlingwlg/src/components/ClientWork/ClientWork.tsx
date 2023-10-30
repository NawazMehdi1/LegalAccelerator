import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import clientWorkSearchQuery from 'core/api/queries/clientWorkSearchQuery';
import useLanguageHook from 'core/hooks/useLanguageHook';
import { newFormatDate } from 'core/utils/formatDate';
import { useI18n } from 'next-localization';
import { Field, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'src/core/atoms/Image';

import {
  useSitecoreContext,
  RichText as JssRichText,
  withDatasourceCheck,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Slider from 'react-slick';

type ClientWorkProps = ComponentProps & {
  fields: {
    data: {
      searchPageType: {
        type: Field<string>;
      };
      datasource: {
        SeeMore: {
          jsonValue: {
            value: {
              href: string;
              text: string;
              querystring: string;
            };
          };
        };
      };
    };
  };
};

interface ClientWorkItem {
  id: number;
  published_date: string;
  name: string;
  page_type: string;
  page_type_icon: string;
  url: string;
}
interface ApiResponse {
  widgets: {
    content: ClientWorkItem[];
  }[];
}
interface RouteFields {
  [key: string]: unknown;
  Title: Field<string>;
}

const ClientWorks = (props: ClientWorkProps): JSX.Element => {
  const { t } = useI18n();
  const { language, country } = useLanguageHook();
  const [isCarousel, setIsCarousel] = useState(false);
  const { sitecoreContext } = useSitecoreContext();
  const fields = sitecoreContext?.route?.fields as RouteFields;
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const searchApiUrl = sitecoreContext?.SearchApiUrl as string;
  const searchPageType = props?.fields?.data?.searchPageType?.type?.value;
  const searchServiceName = fields?.Title?.value as string;
  const searchSource = sitecoreContext?.SearchSource as string;
  const prettyQuerystring = (
    props?.fields?.data?.datasource?.SeeMore?.jsonValue?.value?.querystring || ''
  )
    .replace('?', '')
    .replace('={0}', '');
  const { data } = useQuery({
    queryKey: ['clientWork', { searchPageType, searchServiceName }],
    queryFn: () =>
      clientWorkSearchQuery(searchApiUrl, {
        language,
        country,
        searchPageType,
        searchServiceName,
        searchSource,
        serviceName: prettyQuerystring,
      }),
  });
  const [clientWorkData, setClientWorkData] = useState<ClientWorkItem[]>([]);
  const numClientWorks = clientWorkData.length;
  useEffect(() => {
    if (data) {
      const contentArray = (data as ApiResponse).widgets[0]?.content;
      if (Array.isArray(contentArray)) {
        setClientWorkData(contentArray);
      }
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth > 991;
      setIsCarousel(!isDesktop);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isCarousel) {
    const columnClass = getGridColumnClass(clientWorkData.length);
    const shouldRenderSeeMoreButton = numClientWorks >= 3;
    if (clientWorkData.length == 0) {
      return <></>;
    }
    return (
      <>
        {(clientWorkData || isEditing) && (
          <div className="grid  p-[22px] lg:py-[80px]">
            <h3 className="ml-auto text-black leading-normal tracking-[-0.96px] mb-[37px] grid gap-4  w-full max-w-[1200px] 2xl:max-w-[1440px] mx-auto">
              {t('ClientWork')}
            </h3>
            <div
              className={`grid-cols-${columnClass} grid gap-4 w-full max-w-[1200px] 2xl:max-w-[1440px] mx-auto`}
            >
              {clientWorkData.map((item) => (
                <div key={item.id} className="bg-extraLightGrey hover:shadow-custom">
                  <a href={item?.url} className="h-full block">
                    <div className="lg:py-[40px] px-[30px]">
                      <div className="lg:mb-[20px] flex items-center">
                        {item?.page_type_icon && (
                          <Image
                            className="mr-[11px] w-[26px]"
                            field={{
                              value: {
                                src: item.page_type_icon,
                              },
                            }}
                          />
                        )}
                        <Text
                          tag="span"
                          field={{
                            value: item?.page_type,
                            editable: item?.page_type,
                          }}
                          className="text-darkBlue text-[16px] font-bold leading-normal lg:mr-[11px] text-center"
                        />
                        <span className="text-black leading-[156%]">
                          {newFormatDate(
                            item?.published_date,
                            sitecoreContext.language as unknown as string
                          )}
                        </span>
                      </div>
                      <JssRichText
                        field={{
                          value: item?.name,
                          editable: item?.name,
                        }}
                        title={item?.name}
                        className="text-black text-[24px] font-bold leading-normal"
                      />
                    </div>
                  </a>
                </div>
              ))}
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
            <style jsx>{`
              .grid-cols-1 {
                grid-template-columns: 1fr;
                display: grid;
                grid-gap: 1rem;
              }
              .grid-cols-2 {
                grid-template-columns: repeat(2, 1fr);
                display: grid;
                grid-gap: 1rem;
              }
              .grid-cols-3 {
                grid-template-columns: repeat(3, 1fr);
                display: grid;
                grid-gap: 1rem;
              }
              .expanded {
                grid-column: span ${columnClass === 2 ? 2 : 3};
              }
            `}</style>
          </div>
        )}
      </>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <span className="slick-prev" />,
    nextArrow: <span className="slick-next" />,
    arrows: false,
  };
  if (clientWorkData.length == 0) {
    return <></>;
  }

  return (
    <>
      {(clientWorkData || isEditing) && (
        <div className="carousel  py-[40px] px-[20px] relative clientWork-react-slick-container">
          <h3 className="leading-normal text-black tracking-[-0.96px] mb-[37px]">
            {t('ClientWork')}
          </h3>
          <Slider {...settings}>
            {clientWorkData.map((item) => (
              <div key={item.id}>
                <a href={item?.url} className="block px-1">
                  <div className="py-[40px] px-[30px] mb-[40px] bg-extraLightGrey w-[328px]">
                    <div className="mb-[20px] flex items-center">
                      {item?.page_type_icon && (
                        <Image
                          className="mr-[11px] w-[26px]"
                          field={{
                            value: {
                              src: item.page_type_icon,
                            },
                          }}
                        />
                      )}
                      <Text
                        tag="span"
                        field={{
                          value: item?.page_type,
                          editable: item?.page_type,
                        }}
                        className="text-darkBlue text-[16px] font-bold leading-normal mr-[11px] text-center"
                      />
                      <span className="text-black leading-[156%]">
                        {newFormatDate(
                          item?.published_date,
                          sitecoreContext.language as unknown as string
                        )}
                      </span>
                    </div>
                    <JssRichText
                      field={{
                        value: item?.name,
                        editable: item?.name,
                      }}
                      title={item?.name}
                      className="text-black text-[24px] font-bold leading-normal"
                    />
                  </div>
                </a>
              </div>
            ))}
          </Slider>
          <div className="flex items-center justify-center">
            <Link
              field={{
                text: props?.fields?.data?.datasource?.SeeMore?.jsonValue?.value?.text,
                href: props?.fields?.data?.datasource?.SeeMore?.jsonValue?.value?.href,
                querystring:
                  props?.fields?.data?.datasource?.SeeMore?.jsonValue?.value?.querystring
                    ?.replace('{0}', searchServiceName)
                    .replace('?', '') || '',
              }}
              className="bg-darkBlue hover:bg-[#106597] mt-[40px] text-[14px] font-bold leading-normal tracking-[0.56px] flex items-center justify-center text-white  rounded-[100px] w-[159px] h-[60px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

function getGridColumnClass(numCards: number): number {
  if (numCards === 1) {
    return 1;
  } else if (numCards === 2) {
    return 2;
  } else {
    return 3;
  }
}
export default withDatasourceCheck()(ClientWorks);
