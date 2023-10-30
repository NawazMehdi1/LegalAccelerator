import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { Text, Field, withDatasourceCheck, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import YoutubeIntegration from '../../core/molecules/YoutubeEmbedded/YoutubeEmbedded';
import DownArrow from 'core/atoms/Icons/DownArrow';
import { useI18n } from 'next-localization';

type YouTubeVideoProps = ComponentProps & {
  fields: {
    TranscriptText: TextField;
    VideoTitle: TextField;
    VideoDescription: TextField;
    VideoId: {
      value: string;
    };
  };
};

type YoutubeIntegration = {
  VideoIdVal: Field<string>;
};

type AccordiaProp = {
  className: string;
  children: string;
  fields: {
    TranscriptText: TextField;
  };
};

const YouTubeVideo = (props: YouTubeVideoProps): JSX.Element => {
  const { t } = useI18n();
  const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
  >(({ children, className, ...props }: AccordiaProp, forwardedRef) => (
    <AccordionPrimitive.Header className="AccordionHeader">
      <AccordionPrimitive.Trigger
        className={classNames('AccordionTrigger', className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <div className="AccordionChevron">
          <DownArrow aria-hidden fill="#231F20" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ));

  AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

  const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
  >(({ children, className, ...props }: AccordiaProp, forwardedRef) => (
    <AccordionPrimitive.Content
      className={classNames(
        'AccordionContent mt-[5px] pl-[20px] pb-[43px] pr-[32px] lg:pr-[212px]',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <p className="AccordionContentText line-clamp-[15] text-trueBlack">{children}</p>
    </AccordionPrimitive.Content>
  ));
  AccordionContent.displayName = AccordionPrimitive.Content.displayName;
  return (
    <div className="w-full sm:mt-[26px] mt-[74px] max-w-[1200px] 2xl:max-w-[1440px] m-auto">
      <Text
        field={props?.fields?.VideoTitle}
        className="pt-[74px] sm:pt-0 w-full mb-[20px] leading-normal text-black"
        tag="h4"
      />
      <Text
        field={props?.fields?.VideoDescription}
        className="w-full mb-[40px] leading-[156%] md:leading-normal text-black md:text-[24px]"
        tag="p"
      />
      <div>
        {props?.fields?.VideoId?.value && (
          <YoutubeIntegration
            VideoIdVal={props?.fields?.VideoId?.value}
            title={props?.fields?.VideoId.value}
          />
        )}
        {props?.fields?.TranscriptText && props?.fields?.VideoId?.value ? (
          <div>
            <div className="border-b-[1px] border-b-aubergine w-100" data-testid="accordian" />
            <AccordionPrimitive.Root
              className="AccordionRoot mt-5"
              type="single"
              collapsible={true}
            >
              <AccordionPrimitive.Item
                className="AccordionItem bg-extraLightGrey"
                value="item-1"
                data-state="closed"
              >
                <AccordionTrigger className="bg-extraLightGrey w-full flex justify-between items-center pl-[20px] pr-[14px] lg:pr-[41px] py-[15px]">
                  <div className="body-text font-bold text-black leading-normal">
                    {t('ViewTranscript')}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Text field={props?.fields?.TranscriptText} />
                </AccordionContent>
              </AccordionPrimitive.Item>
            </AccordionPrimitive.Root>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default withDatasourceCheck()<YouTubeVideoProps>(YouTubeVideo);
