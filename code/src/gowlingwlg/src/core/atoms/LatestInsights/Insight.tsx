import { Image, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { Insight, handleDivClick } from 'components/Latestinsights/LatestInsights';
import { newFormatDate } from 'core/utils/formatDate';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';

interface InsightProps {
  insight: Insight;
  language: string;
  isMobile: boolean;
}

const InsightComponent = ({ insight, language, isMobile }: InsightProps) => {
  const { t } = useI18n();
  const router = useRouter();

  const onClickTile = (url: string | undefined) => {
    if (url) {
      router.push(url);
    }
    handleDivClick(insight?.page_type, insight?.name, insight?.url);
  };

  return (
    <div
      key={insight?.id}
      className={`cursor-pointer ${isMobile ? 'w-full ' : 'w-[400px] mr-[71px]'}`}
      onClick={() => onClickTile(insight?.url)}
    >
      <Image
        className="w-full min-h-[221px] mb-[44px]"
        field={{
          value: {
            src: insight?.image_url,
            width: 350,
            height: 221,
          },
        }}
      />
      <div className="flex items-center mb-[14px] max-w-[90%]">
        <div className="mr-[11px]">
          <Image
            className="w-[26px] h-[26px]"
            field={{
              value: {
                src: insight?.page_type_icon,
                width: 26,
                height: 26,
              },
            }}
          />
        </div>
        <Text
          className="text-darkBlue font-bold font-arial text-[16px] mr-[10px] leading-normal"
          tag="span"
          field={{ value: insight?.page_type }}
        />
        <Text
          field={{
            value: t('Published') + ' ' + newFormatDate(insight?.published_date, language),
          }}
          tag="span"
          className="font-arial text-[10px] text-black leading-[140%] mr-[10px]"
        />
      </div>
      <Text
        field={{
          value: insight?.name,
        }}
        tag="h4"
        className="text-trueBlack font-arial text-[24px] font-normal leading-normal"
      />
    </div>
  );
};

export default InsightComponent;
