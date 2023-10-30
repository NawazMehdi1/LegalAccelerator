import {
  Field,
  withDatasourceCheck,
  ImageField,
  Image,
  Text,
  LinkField,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';

type CTAProps = ComponentProps & {
  fields: {
    CTALink: LinkField;
    Description: Field<string>;
    Title: Field<string>;
    Image: ImageField;
  };
};

const CTA = ({ fields }: CTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const Alerttooltip = sitecoreContext?.ExternalLinkToolTipText;
  const checkFEIcon = fields?.Image?.value?.src;
  return (
    <div className="bg-darkBlue">
      <div
        className={`gap-[1.875rem] md:flex lg:py-8 md:flex-row flex-col py-6 2xl:max-w-[90rem] w-full items-center md:mx-[2.125rem] justify-center xl:m-auto text-white px-6 md:px-0 mt-4 max-w-[75rem]`}
      >
        <div className="place-content-center grid">
          {checkFEIcon !== '' && (
            <Image
              field={fields?.Image}
              className="object-cover flex-none w-[4rem] m-auto h-[4rem] sm:block"
            />
          )}
        </div>
        <Text
          tag="h5"
          className="md:my-0 font-arial text-3xl my-[2.75rem] flex-1  lg:text-2xl font-bold"
          field={fields?.Description}
        />
        {fields?.CTALink?.value?.text && (
          <>
            {fields?.CTALink?.value?.linktype === 'internal' ? (
              <JssLink
                className={
                  'leading-normal text-white ease-in-out transition delay-100 font-bold min-w-[11.75rem] tracking-[0.56px] text-[0.875rem] font-arial  rounded-xxl px-[2.875rem] py-[1.375rem] flex  justify-center bg-aubergine items-center w-auto '
                }
                field={{ ...fields?.CTALink, text: fields?.CTALink?.value?.text?.slice(0, 50) }}
              />
            ) : (
              <TooltipProvider skipDelayDuration={100} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    className=
                    {
                      'bg-aubergine text-white delay-100 transition ease-in-out font-bold leading-normal text-[0.875rem] tracking-[0.56px] rounded-xxl px-[2.875rem] min-w-[11.75rem] font-arial py-[1.375rem] flex justify-center items-center w-auto'
                    }
                    <JssLink
                      field={{
                        ...fields?.CTALink,
                        text: fields?.CTALink?.value?.text?.slice(0, 50),
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="p-0 border-none max-w-[11.25rem]" side="bottom">
                    <div dangerouslySetInnerHTML={{ __html: `${Alerttooltip}` }}></div>
                    <TooltipArrow className="w-6 fill-white h-2" />
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
