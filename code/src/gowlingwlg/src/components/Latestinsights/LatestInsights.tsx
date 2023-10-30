import { Text, Field, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useQuery } from '@tanstack/react-query';
import latestInsightsSearchQueryFn from 'core/api/queries/latestInsightsSearchQueryFn';
import MobileCarousel from 'core/atoms/LatestInsights/Carousel';
import InsightComponent from 'core/atoms/LatestInsights/Insight';
import useLanguageHook from 'core/hooks/useLanguageHook';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import { useEffect, useState } from 'react';

type LatestInsightsProps = ComponentProps & {
  fields: {
    data: {
      searchCategoryType: {
        type: Field<string>;
      };
      SiteConfiguration: {
        latestInsightsSeeAllLink: {
          jsonValue: {
            value: {
              text: string;
              href: string;
              querystring: string;
            };
          };
        };
      };
    };
  };
};

export interface Widgets {
  widgets: {
    total_item: number;
    content: Array<Insight>;
  }[];
}

export interface Insight {
  image_url: string;
  published_date: string;
  name: string;
  id: string;
  page_type: string;
  url: string;
  page_type_icon: string;
}

interface RouteFields {
  [key: string]: unknown;
  AlternateTitle: Field<string>;
  Title: Field<string>;
}

interface DataLayerEvent {
  event: string;
  insight_type?: string;
  insight_title?: string;
  insight_link?: string;
}
export const handleDivClick = (type: string, title: string, link: string) => {
  const eventData: DataLayerEvent = {
    event: 'insights_click',
    insight_type: type,
    insight_title: title,
    insight_link: link,
  };
  window.dataLayer.push(eventData);
};
const LatestInsights = (props: LatestInsightsProps): JSX.Element => {
  const { t } = useI18n();
  const { language, country } = useLanguageHook();
  const { sitecoreContext } = useSitecoreContext();
  const CTA_link = `${
    props?.fields?.data?.SiteConfiguration?.latestInsightsSeeAllLink?.jsonValue?.value?.href
  }${
    props?.fields?.data?.SiteConfiguration?.latestInsightsSeeAllLink?.jsonValue?.value?.querystring.split(
      '='
    )[0]
  }=${sitecoreContext?.route?.name}`;
  const [insightsItems, setInsightItems] = useState<Insight[]>([]);
  const [isCarousel, setIsCarousel] = useState(false);
  const fields = sitecoreContext?.route?.fields as RouteFields;
  const searchApiUrl = sitecoreContext?.SearchApiUrl as string;
  const searchSource = sitecoreContext?.SearchSource as string;
  const searchProfileName = fields?.AlternateTitle?.value;
  const searchCategoryType = props?.fields?.data?.searchCategoryType?.type?.value;

  const { data } = useQuery({
    queryKey: ['latestInsights', { searchCategoryType, searchProfileName }],

    queryFn: () =>
      latestInsightsSearchQueryFn(searchApiUrl, {
        searchSource,
        searchCategoryType,
        searchProfileName,
        language,
        country,
      }),
  });

  useEffect(() => {
    if (data?.widgets?.[0]?.content) {
      setInsightItems(data?.widgets?.[0]?.content);
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

  if (insightsItems?.length === 0) {
    return <></>;
  }

  if (isCarousel) {
    return (
      <MobileCarousel
        insightsItems={insightsItems}
        language={language}
        prettyName={fields?.AlternateTitle?.value || fields?.Title?.value}
        linkField={props?.fields?.data}
      />
    );
  }
  if (insightsItems?.length === 0) {
    return <></>;
  }
  return (
    <div className="">
      <div className="latest-insights content-block justify-center items-center ">
        <Text
          field={{
            value: t('InsightsFrom') + ' ' + fields?.AlternateTitle?.value || fields?.Title?.value,
          }}
          tag="h2"
          className="text-aubergine font-bold font-bliss text-[3rem] leading-[3rem] mb-[52px] pt-[50px]"
        />

        <div className="flex w-full mb-[40px]">
          {insightsItems?.map((insight) => {
            return (
              <InsightComponent
                key={insight.id}
                insight={insight}
                isMobile={isCarousel}
                language={language}
              />
            );
          })}
        </div>

        <p className="text-center hidden md:block justify-center mt-[70px] md:mt-[102px] mb-[82px] md:mb-[80px]">
          <a
            href={`${CTA_link}`}
            className="rounded-full  px-[46px] py-[22px] text-black text-[14px] bg-lightBlue hover:bg-darkBlue font-bold leading-normal"
          >
            {t('SeeAll')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LatestInsights;
