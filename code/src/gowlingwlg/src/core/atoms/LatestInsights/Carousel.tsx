import { Link, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Slider from 'react-slick';
import { Insight } from 'components/Latestinsights/LatestInsights';
import InsightComponent from './Insight';
import { useI18n } from 'next-localization';
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

interface MobileCarouselProps {
  prettyName: string | undefined;
  insightsItems: Insight[];
  language: string;
  linkField: {
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
}

const MobileCarousel = ({
  insightsItems,
  prettyName,
  language,
  linkField,
}: MobileCarouselProps) => {
  const { t } = useI18n();
  return (
    <div className="latest-insights justify-center pl-[20px] pr-[18px] items-center related-news contentcards-react-slick-container  bg-lightGrey">
      <Text
        field={{
          value: 'Insights from ' + prettyName,
        }}
        tag="h2"
        className="text-trueBlack font-bold font-bliss text-[32px]  leading-[40px] mb-[50px] pt-[35px]"
      />
      <Slider {...settings} className="flex w-full mb-[40px]">
        {insightsItems?.map((insight) => {
          return (
            <InsightComponent
              key={insight.id}
              insight={insight}
              isMobile={true}
              language={language}
            />
          );
        })}
      </Slider>
      <div className="flex items-center justify-center mt-[7.5rem] pb-[4.936rem] lg:pb-[6.31rem]">
        <Link
          field={{
            text: t('SeeAll'),
            href:
              linkField?.SiteConfiguration?.latestInsightsSeeAllLink?.jsonValue?.value?.href +
                linkField?.SiteConfiguration?.latestInsightsSeeAllLink?.jsonValue?.value
                  ?.querystring || '',
          }}
          className="flex p-[1.375rem_2.875rem] rounded-[100px] bg-[#21ADE4] max-w-[9.125rem] font-bold"
        />
      </div>
    </div>
  );
};

export default MobileCarousel;
