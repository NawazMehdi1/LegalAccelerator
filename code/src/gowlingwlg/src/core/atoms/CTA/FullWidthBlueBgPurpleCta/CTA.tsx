import {
  Field,
  withDatasourceCheck,
  LinkField,
  Link as JssLink,
  ImageField,
  Image,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';

import { ComponentProps } from 'lib/component-props';

type CTAProps = ComponentProps & {
  params: {
    Styles: Field<string>;
    FullWidthBlueBgPurpleCta: Field<string>;
  };
  fields: {
    Description: Field<string>;
    CTALink: LinkField;
    Image: ImageField;
    Title: Field<string>;
    AlertTitle: Field<string>;
    AlertDescription: Field<string>;
  };
};

const CTA = ({ fields }: CTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;
  const checkFEIcon = fields?.Image?.value?.src;
  const hasValues = checkFEIcon || fields?.Description?.value || fields?.CTALink?.value?.text;

  if (!hasValues) {
    return <></>;
  }

  return (
    <div className="bg-darkBlue">
      <div
        className={`py-6 lg:py-8 md:flex flex-col md:flex-row gap-[30px] justify-center w-full items-center max-w-[1200px] 2xl:max-w-[1440px] md:mx-[34px] xl:m-auto px-6 md:px-0 mt-4 text-white   `}
      >
        <div className="grid place-content-center">
          {checkFEIcon !== '' && (
            <Image
              field={fields?.Image}
              className="sm:block m-auto flex-none w-[4rem] h-[4rem] object-cover"
            />
          )}
        </div>
        <Text
          field={fields?.Description}
          className="flex-1 my-[44px] md:my-0  text-3xl  lg:text-2xl font-bold font-arial"
          tag="h5"
        />
        {fields?.CTALink?.value?.text && (
          <>
            {fields?.CTALink?.value?.linktype === 'internal' ? (
              <JssLink
                field={{ ...fields?.CTALink, text: fields?.CTALink?.value?.text?.slice(0, 50) }}
                className={
                  '  text-white transition ease-in-out delay-100 text-[14px] font-bold leading-normal tracking-[0.56px]  font-arial bg-aubergine rounded-xxl px-[46px] py-[22px] flex justify-center items-center w-auto min-w-[11.75rem]'
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
                        '  text-white transition ease-in-out delay-100 text-[14px]  font-bold leading-normal tracking-[0.56px]  font-arial bg-aubergine rounded-xxl px-[46px] py-[22px] flex justify-center items-center w-auto min-w-[188px]'
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
  );
};

export default withDatasourceCheck()<CTAProps>(CTA);
