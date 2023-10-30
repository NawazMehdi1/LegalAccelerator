import {
  Field,
  Text,
  withDatasourceCheck,
  LinkField,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type CTATileProps = ComponentProps & {
  params: {
    Styles: Field<string>;
  };
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    CTA: LinkField;
    BackgroundImage?: ImageField;
  };
};

interface DataLayerEvent {
  event: string;
  cta_text?: string | undefined;
  cta_url?: string | undefined;
}
const CTATile = (props: CTATileProps): JSX.Element => {
  const handleVideoCtaClick = (ctaText: string | undefined, url: string | undefined) => {
    const eventData: DataLayerEvent = {
      event: 'cta_button_click',
      cta_text: ctaText,
      cta_url: url,
    };
    window.dataLayer.push(eventData);
  };
  const CTAText = {
    value: { ...props?.fields?.CTA?.value, text: props?.fields?.CTA?.value?.text?.slice(0, 50) },
  };
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const ctatile =
    props?.fields?.Title?.value ||
    props?.fields?.Description?.value ||
    props?.fields?.CTA?.value?.text;
  return (
    <>
      {(ctatile || isEditing) && (
        <div data-testid="cta-tile" className="mt-[26px] z-0">
          <div
            className={`h-auto w-full ${props.params?.Styles} ${
              props?.fields?.BackgroundImage?.value?.src
                ? `relative before:content-[''] before:bg-black/50 before:z-0 before:w-[100%] before:h-[100%] before:absolute before:left:-[0] before:top-[0]`
                : ''
            }`}
            style={{
              backgroundImage: `url('${props?.fields?.BackgroundImage?.value?.src}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="px-5 py-8">
              {props?.fields?.Title?.value && (
                <Text
                  tag="h4"
                  className="text-2xl relative z-10 font-bold font-arial line-clamp-2"
                  field={{
                    ...props?.fields?.Title,
                    value: props?.fields?.Title?.value?.slice(0, 50),
                  }}
                />
              )}
              {props?.fields?.Description?.value && (
                <JssRichText
                  tag="p"
                  className="text-base my-5 relative z-10 line-clamp-4"
                  field={{
                    ...props?.fields?.Description,
                    value: props?.fields?.Description?.value,
                  }}
                />
              )}
              {props?.fields?.CTA?.value?.text && (
                <JssLink
                  href={props?.fields?.CTA?.value?.href}
                  title={props?.fields?.CTA?.value?.title}
                  target={props?.fields?.CTA?.value?.target}
                  onClick={() =>
                    handleVideoCtaClick(
                      props?.fields?.CTA?.value?.text,
                      props?.fields?.CTA?.value?.href
                    )
                  }
                  className={`bg-purple px-[1.25rem] lg:px-[2.875rem]  max-w-[100%]  py-[1.375rem] mt-10 mb-4 w-max text-center hover:bg-darkPurple relative z-10  flex text-sm justify-center items-center rounded-xxl text-white font-bold font-arial ${props.fields?.CTA.value.class}`}
                  field={CTAText}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withDatasourceCheck()<CTATileProps>(CTATile);
