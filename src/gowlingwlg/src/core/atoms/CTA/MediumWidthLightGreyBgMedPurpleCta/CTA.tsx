import {
  withDatasourceCheck,
  Link as JssLink,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { CTAProps } from '../types';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';

const CTA = ({ fields }: CTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;

  const hasValues =
    fields?.Title?.value ||
    fields?.Description?.value ||
    fields?.CTALink?.value?.text ||
    fields?.CTALink2?.value?.text;

  if (!hasValues) {
    return <></>;
  }

  return (
    <div className="bg-extraLightGrey">
      <div
        className={`max-w-[1440px] py-[40px] text-black gap-[30px] flex flex-col m-auto w-full px-4 lg:px-14 justify-center lg:py-[108px]`}
      >
        <JssRichText
          field={fields?.Title}
          className="font-gowlingBliss md:text-[48px] font-bold text-[2rem]"
        />
        <JssRichText
          field={fields?.Description}
          className="font-normal text-trueBlack text-base font-arial"
        />
        <div className="flex">
          {fields?.CTALink?.value?.text && (
            <>
              {fields?.CTALink?.value?.linktype === 'internal' ? (
                <JssLink
                  field={{ ...fields?.CTALink, text: fields?.CTALink?.value?.text?.slice(0, 50) }}
                  className={
                    'md:max-w-[188px] h-[64px] text-white transition font-bold bg-mainPurple rounded-xxl  flex  justify-center items-center mr-6 leading-normal tracking-[0.56px] w-full  font-arial ease-in-out delay-100 text-[14px]'
                  }
                />
              ) : (
                <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <JssLink
                        field={{
                          ...fields?.CTALink,
                          text: fields?.CTALink?.value?.text?.slice(0, 50),
                        }}
                        className={
                          'leading-normal ease-in-out delay-100 text-[14px] text-white transition font-bold  tracking-[0.56px] w-full md:max-w-[188px] bg-mainPurple rounded-xxl h-[64px] justify-center items-center mr-6 font-arial flex '
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0 border-none max-w-[180px]">
                      <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                      <TooltipArrow className="fill-white h-2 w-6 " />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          )}
          {fields?.CTALink2?.value?.text && (
            <>
              {fields?.CTALink2?.value?.linktype === 'internal' ? (
                <JssLink
                  field={{ ...fields?.CTALink2, text: fields?.CTALink2?.value?.text?.slice(0, 50) }}
                  className={
                    ' delay-100 font-bold leading-normal ease-in-out tracking-[0.56px] text-[14px] w-full md:max-w-[188px] h-[64px] font-arial text-white transition bg-mainPurple rounded-xxl flex mr-6 justify-center items-center '
                  }
                />
              ) : (
                <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <JssLink
                        field={{
                          ...fields?.CTALink2,
                          text: fields?.CTALink2?.value?.text?.slice(0, 50),
                        }}
                        className={
                          ' font-bold leading-normal text-white transition ease-in-out delay-100 text-[14px] tracking-[0.56px] w-full font-arial bg-mainPurple rounded-xxl md:max-w-[188px] h-[64px] flex justify-center items-center mr-6'
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="border-none p-0 max-w-[180px]">
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
    </div>
  );
};
export default withDatasourceCheck()<CTAProps>(CTA);
