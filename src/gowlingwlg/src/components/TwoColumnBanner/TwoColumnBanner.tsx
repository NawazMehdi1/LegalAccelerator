import { Text, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import VectorCircle from 'core/atoms/Icons/VectorCircle';
import { ComponentProps } from 'lib/component-props';

type TwoColumnBannerProps = ComponentProps & {
  fields: {
    Title: {
      value: string;
    };
    LeftSection: {
      value: string;
    };
    RightSection: {
      value: string;
    };
  };
};

const TwoColumnBanner = (props: TwoColumnBannerProps): JSX.Element => {
  const defaultBackgroundColorClass = 'bg-purple2';
  const backgroundColorClass = props?.params?.Styles || defaultBackgroundColorClass;
  const hasData =
    props?.fields?.Title?.value !== '' ||
    props?.fields?.LeftSection?.value !== '' ||
    props?.fields?.RightSection?.value !== '';

  if (!hasData) {
    return <></>;
  }

  return (
    <div
      className={`relative overflow-hidden grid body-text col-span-12 m-auto max-w-[75rem] 2xl:max-w-[90rem] px-[1.375rem] md:px-[2.125rem] xl:m-auto py-7 lg:py-14 lg:px-1.75rem ${backgroundColorClass}`}
    >
      <div className="hidden xl:block absolute -right-[4.5rem] rotate-12 -top-[17.1rem]">
        <VectorCircle />
      </div>
      <Text
        tag="h3"
        field={props?.fields?.Title}
        className="text-white mb-[1.25rem] leading-[3.579rem]"
      />
      <div className="lg:flex">
        <RichText
          field={props?.fields?.LeftSection}
          className="w-full lg:w-1/2 lg:pr-14 text-white text-2xl font-[400] font-arial leading-[1.725rem] rte mb-5 lg:mb-0"
        />
        <RichText
          field={props?.fields?.RightSection}
          className="w-full lg:w-1/2 text-white text-base font-[400] font-arial leading-[1.56rem] rte lg:pr-24"
        />
      </div>
    </div>
  );
};

export default TwoColumnBanner;
