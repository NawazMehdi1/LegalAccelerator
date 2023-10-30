import React from 'react';
import { ComponentProps } from 'lib/component-props';
import {
  Field,
  ImageField,
  RichText as JssRichText,
  LinkField,
  Text,
  Link as JssLink,
  Image,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';

export type CTAProps = ComponentProps & {
  fields: {
    Description: Field<string>;
    CTALink: LinkField;
    Image: ImageField;
    Title: Field<string>;
    AlertTitle: Field<string>;
    AlertDescription: Field<string>;
    IsImageRight: Field<boolean>;
  };
};

const CTA = (props: CTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;
  const hasValues =
    props?.fields?.Title?.value.length ||
    props?.fields?.Description?.value.length ||
    props?.fields?.AlertTitle?.value.length ||
    props?.fields?.AlertDescription?.value.length ||
    props?.fields?.IsImageRight?.value ||
    props?.fields?.Image?.value?.asset != null;

  if (!hasValues) {
    return <></>;
  }
  const isImageRight = props?.fields.IsImageRight?.value;

  return (
    <div
      data-testid="cta-detail"
      className={`bg-extraLightGrey ${
        isImageRight
          ? 'py-[6.563rem]'
          : 'md:mt-[5.938rem] mt-[2.938rem] md:mb-[2.5rem] mb-[2.313rem]'
      }`}
    >
      <div
        className={`flex flex-col md:flex-row body-text m-auto max-w-[1200px] 2xl:max-w-[1440px] mx-[22px] md:mx-[34px] xl:m-auto bg-extraLightGrey ${
          isImageRight ? 'gap-x-[7.688rem]' : 'gap-x-[75px]'
        }  m-auto`}
      >
        <div
          className={`order-2 md:order-${isImageRight ? '1' : '2'}${
            isImageRight
              ? 'pr:0 2xl:w-[43.938rem] xl:w-[22rem] pl-[1.875rem] pb-[2.5rem]'
              : 'md:pr-[100px] md:px-0 px-[25px] md:pb-0 pb-[50px] '
          }`}
        >
          <Text
            tag="h4"
            field={props?.fields?.Title}
            className={`tracking-[-0.64px] ${
              isImageRight
                ? 'mt-[40px] font-gowlingBliss'
                : 'md:mt-[40px] mt-[30px] font-arial md:font-gowlingBliss text-[24px] md:text-[32px]'
            } font-bold text-black leading-normal md:text-[2rem] text-[1.5rem] tracking-[-0.04rem]`}
          />
          <JssRichText
            field={props?.fields?.Description}
            target="p"
            className={` ${
              isImageRight ? 'text-trueBlack mb-[1.563rem] mt-[1.563rem]' : 'text-black mb-[39px]'
            } font-arial mt-5 text-base font-normal leading-[156%]`}
          />
          {props?.fields?.CTALink?.value?.text && (
            <>
              {props?.fields?.CTALink?.value?.linktype === 'internal' ? (
                <JssLink
                  field={{
                    ...props?.fields?.CTALink,
                    text: props?.fields?.CTALink?.value?.text?.slice(0, 50),
                  }}
                  className={`text-white transition ease-in-out delay-100 text-[14px]  font-bold leading-normal tracking-[0.56px]  font-arialw-[fit-content] max-w-max ${
                    isImageRight ? 'bg-mainPurple' : 'bg-darkBlue'
                  } rounded-xxl px-[46px] py-[22px] flex  justify-center items-center`}
                />
              ) : (
                <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <JssLink
                        field={{
                          ...props?.fields?.CTALink,
                          text: props?.fields?.CTALink?.value?.text?.slice(0, 50),
                        }}
                        className={`text-white transition ease-in-out delay-100 text-[14px]  font-bold leading-normal tracking-[0.56px]  font-arial w-[fit-content] min-w-[12rem] ${
                          isImageRight ? 'bg-mainPurple' : 'bg-darkBlue'
                        }  rounded-xxl px-[46px] py-[22px]  flex justify-center items-center`}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0 max-w-[180px] border-none">
                      <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                      <TooltipArrow className="fill-white h-2 w-6 " />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          )}
        </div>
        <div
          className={`order-1 md:order-${isImageRight ? '2' : '1'} ${
            !isImageRight
              ? 'md:h-[414px] md:max-h-full max-h-[200px] w-full max-w-[37.5rem]'
              : 'md:w-[38.125rem] md:h-[25.313rem] md:mr-[2.1rem] min-w-[18.75rem]'
          }`}
        >
          <Image
            field={{ ...props?.fields?.Image, value: props?.fields?.Image?.value }}
            className="h-full w-full object-cover min-w-[18.75rem] md:mr-[2.1rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default CTA;
