import {
  withDatasourceCheck,
  Link as JssLink,
  RichText as JssRichText,
  Text,
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
    fields?.Title?.value || fields?.Description?.value || fields?.CTALink?.value?.text;
  if (!hasValues) {
    return <></>;
  }
  return (
    <div className="bg-aubergine FullWidthPurpleBgBlueBgCta">
      <div
        className={`py-[24px] lg:py-[60px]  justify-center w-full px-[1.375rem] md:px-0 text-black max-w-[1200px] 2xl:max-w-[1440px] md:mx-[34px] xl:m-auto`}
      >
        <div className="flex flex-col md:flex-row gap-[30px]">
          <div className="w-full md:w-[70%]">
            <Text
              field={fields?.Title}
              className="text-white leading-normal tracking-[-0.06rem] text-[2rem] md:text-[3rem]"
              tag="h3"
            />

            <JssRichText field={fields?.Description} className="  text-white  " />
          </div>
          {fields?.CTALink?.value?.text && (
            <div className="w-full md:w-[30%] grid place-items-center">
              {fields?.CTALink?.value?.linktype === 'internal' ? (
                <JssLink
                  field={{ ...fields?.CTALink, text: fields?.CTALink?.value?.text?.slice(0, 50) }}
                  className={
                    'text-white transition ease-in-out delay-100 text-[14px]  font-bold leading-normal tracking-[0.56px]  font-arial bg-darkBlue rounded-xxl  w-auto  h-[64px] flex justify-center items-center py-[1.375rem] px-[2.875rem]'
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
                          'text-white transition ease-in-out delay-100 text-[14px]  font-bold leading-normal tracking-[0.56px]  font-arial bg-darkBlue rounded-xxl  w-auto min-w-[188px] h-[64px] flex justify-center items-center py-[1.063rem]  px-[2.875rem]'
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0 max-w-[180px] border-none">
                      <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                      <TooltipArrow className="fill-white h-2 w-6 " />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default withDatasourceCheck()<CTAProps>(CTA);
