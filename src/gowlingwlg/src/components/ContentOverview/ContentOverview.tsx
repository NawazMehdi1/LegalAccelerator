import { RichText, RichTextField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import UpIcon from 'core/atoms/Icons/UpIcon';
import { useI18n } from 'next-localization';

interface FieldValue<T> {
  jsonValue: TextField | undefined;
  value: T;
}

type ContentOverviewProps = ComponentProps & {
  fields: {
    data: {
      item: {
        Title: FieldValue<string>;
        Content: { jsonValue: RichTextField };
      };
    };
  };
  info: FieldValue<string>;
};

const ContentOverview = (props: ContentOverviewProps): JSX.Element => {
  const [isShowMore, setIsShowMore] = useState(false);
  const { t } = useI18n();
  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  const Title = props?.params?.OverrideTitle || t('ContentOverviewTitle');
  return (
    <div className="grid body-text content-rte col-span-12 m-auto max-w-[1200px] 2xl:max-w-[1440px] mx-[22px] md:mx-[34px] xl:m-auto py-6 xl:py-16">
      <h4 className="text-black font-gowlingBliss font-bold mb-[1.25rem] leading-normal">
        {Title}
      </h4>
      <RichText
        field={props?.fields?.data?.item?.Content?.jsonValue}
        className={`text-black text-base font-[300] lg:text-[32px] leading-[normal] font-gowlingBliss line-clamp-6 lg:line-clamp-3 
        ${isShowMore ? 'line-clamp-none lg:line-clamp-none' : ''}`}
      />
      <button
        className="mt-5 leading-normal flex items-center !text-darkBlue font-bold"
        onClick={toggleShowMore}
      >
        {isShowMore ? `${t('seeLess')}` : `${t('seeMore')}`}
        {isShowMore ? (
          <div className="pl-2.5">
            <UpIcon fill="#127BB9" width="28" height="12" />
          </div>
        ) : (
          <div className="pl-2.5 rotate-180">
            <UpIcon fill="#127BB9" width="28" height="12" />
          </div>
        )}
      </button>
    </div>
  );
};

export default ContentOverview;
