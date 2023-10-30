import {
  withDatasourceCheck,
  RichText as JssRichText,
  Text,
  Link as JssLink,
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
    fields?.Title?.value || fields?.Description?.value || fields?.CTALink?.value?.text;
  if (!hasValues) {
    return <></>;
  }
  return (
    <div className="bg-purple2">
      <div
        className={`py-[60px] lg:py-[108px] max-w-[1200px] 2xl:max-w-[1440px] md:mx-[34px] xl:m-auto LargeMedPurpleBgPurpleBgCta justify-center w-full  px-[1.375rem] md:px-0  text-black `}
      >
        <div className="flex flex-col md:flex-row gap-x-[80px]">
          <Text
            field={fields?.Title}
            className="w-full md:max-w-[431px]  text-white text-[78px] leading-normal tracking-[-1.56px]"
            tag="h1"
          />
          <div className="mt-6 md:block flex flex-col items-center">
            <JssRichText
              field={fields?.Description}
              className=" mb-[40px] text-base text-white leading-[156%]  font-normal font-arial"
            />

            {fields?.CTALink?.value?.text && (
              <>
                {fields?.CTALink?.value?.linktype === 'internal' ? (
                  <JssLink
                    field={{ ...fields?.CTALink, text: fields?.CTALink?.value?.text?.slice(0, 50) }}
                    className={
                      ' text-white  text-[14px] max-w-full h-[64px] w-auto min-w-[11.75rem]  font-bold leading-normal tracking-[0.56px]  font-arial bg-aubergine rounded-xxl px-[46px] py-[22px] flex md:inline justify-center items-center'
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
                            ' text-white transition ease-in-out delay-100 text-[14px]  font-bold leading-normal tracking-[0.56px]  font-arial bg-aubergine rounded-xxl px-[46px] py-[22px] flex  justify-center items-center w-[fit-content] min-w-[11.75rem]'
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default withDatasourceCheck()<CTAProps>(CTA);
