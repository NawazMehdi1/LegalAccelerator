import {
  withDatasourceCheck,
  Link as JssLink,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';
import { CTAProps } from '../types';

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
    <div className="bg-white">
      <div
        className={`justify-center w-full max-w-[1440px] lg:px-[6.25rem] text-black xl:m-auto px-[22px]`}
      >
        <JssRichText
          field={fields?.Title}
          className="font-bold md:text-[3rem] text-[2.25rem] leading-normal font-gowlingBliss"
        />

        <JssRichText
          field={fields?.Description}
          className="text-trueBlack font-normal text-base font-arial my-5"
        />
        <div className="flex justify-center md:justify-start">
          {fields?.CTALink?.value?.text && (
            <>
              {fields?.CTALink?.value?.linktype === 'internal' ? (
                <JssLink
                  className={
                    'delay-100 text-[14px] font-bold leading-normal justify-center items-center  tracking-[0.56px]  text-white transition ease-in-out  bg-mainPurple rounded-xxl font-arial flex px-[2.5625rem] py-[1.0625rem] md:px-[2.875rem] md:py-[1.375rem]'
                  }
                  field={{ ...fields?.CTALink, text: fields?.CTALink?.value?.text?.slice(0, 50) }}
                />
              ) : (
                <TooltipProvider skipDelayDuration={100} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <JssLink
                        className={
                          'ease-in-out delay-100 text-white transition text-[14px] flex justify-center items-center mr-6 tracking-[0.56px] w-full md:max-w-[188px] h-[64px] font-arial bg-mainPurple font-bold leading-normal rounded-xxl'
                        }
                        field={{
                          ...fields?.CTALink,
                          text: fields?.CTALink?.value?.text?.slice(0, 50),
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="border-none p-0 max-w-[180px] ">
                      <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                      <TooltipArrow className="w-6 fill-white h-2" />
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
                    'delay-100 text-[14px] font-bold leading-normal justify-center items-center  tracking-[0.56px]  text-white transition ease-in-out  bg-mainPurple rounded-xxl font-arial flex px-[2.875rem] py-[1.375rem]'
                  }
                />
              ) : (
                <TooltipProvider skipDelayDuration={100} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <JssLink
                        className={
                          'ease-in-out delay-100 text-white transition text-[14px] flex justify-center items-center mr-6 tracking-[0.56px] w-full md:max-w-[188px] h-[64px] font-arial bg-mainPurple font-bold leading-normal rounded-xxl'
                        }
                        field={{
                          ...fields?.CTALink2,
                          text: fields?.CTALink2?.value?.text?.slice(0, 50),
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0 max-w-[180px] border-none">
                      <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                      <TooltipArrow className="w-6 fill-white h-2" />
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
