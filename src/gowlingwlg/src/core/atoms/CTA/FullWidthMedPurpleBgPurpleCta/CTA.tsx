import {
  Field,
  withDatasourceCheck,
  LinkField,
  Link as JssLink,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import AlertBEIcon2 from 'core/atoms/Icons/AlertBEIcon2';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';

type CTAProps = ComponentProps & {
  params: {
    Styles: Field<string>;
    FullWidthMedPurpleBgPurpleCta: Field<string>;
  };
  fields: {
    Description: Field<string>;
    CTALink: LinkField;
    Title: Field<string>;
    AlertTitle: Field<string>;
    AlertDescription: Field<string>;
  };
};

const CTA = (props: CTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;
  const hasValues = props?.fields?.Description?.value || props?.fields?.CTALink?.value?.text;
  if (!hasValues) {
    return <></>;
  }
  return (
    <div className="bg-purple relative">
      <div
        className={`max-w-[1200px] 2xl:max-w-[1440px] md:mx-[34px] xl:m-auto px-6 md:px-0 m-auto lg:pt-[2.188rem] lg:pb-[2.813rem] md:flex py-6 justify-center w-full items-center mt-4 text-white  ${props.params?.Styles} `}
      >
        <JssRichText
          field={props?.fields?.Description}
          className="z-[1] md:pl-[3.375rem] my-11 lg:my-[1.094rem] 
          lg:mr-10 flex-1 text-3xl lg:text-2xl font-bold font-arial"
        />

        <div className="relative">
          {props?.fields?.CTALink?.value?.text && (
            <>
              {props?.fields?.CTALink?.value?.linktype === 'internal' ? (
                <JssLink
                  field={{
                    ...props?.fields?.CTALink,
                    text: props?.fields?.CTALink?.value?.text?.slice(0, 50),
                  }}
                  className={`text-white transition ease-in-out delay-100 text-[0.875rem]  font-bold leading-normal tracking-[0.035rem]  font-arialw-[fit-content] max-w-max bg-aubergine rounded-xxl px-[2.875rem] py-[1.375rem] flex  justify-center items-center`}
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
                        className={`text-white transition ease-in-out delay-100 text-[0.875rem]  font-bold leading-normal tracking-[0.035rem]   font-arial w-[fit-content] min-w-[12rem] bg-aubergine  rounded-xxl px-[2.875rem] py-[1.375rem]  flex justify-center items-center`}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0 max-w-[11.25rem] border-none">
                      <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                      <TooltipArrow className="fill-white h-2 w-6 " />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 z-0 h-full">
        <AlertBEIcon2 />
      </div>
    </div>
  );
};

export default withDatasourceCheck()<CTAProps>(CTA);
