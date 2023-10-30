import { Link, RichText, Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SubscribeProps = ComponentProps & {
  fields: {
    SubscribeText: Field<string>;
    CTA: LinkField;
  };
};
interface DataLayerEvent {
  event: string;
}
const Subscribe = (props: SubscribeProps): JSX.Element => {
  const handleCtaClick = () => {
    const eventData: DataLayerEvent = {
      event: 'click_subscribe_to_newsletter',
    };
    window.dataLayer.push(eventData);
  };
  const isInternalLink = props?.fields?.CTA?.value?.linktype === 'internal';
  const text = props?.fields?.CTA?.value?.text != '';
  const link = props?.fields?.CTA?.value?.href != '';
  return (
    <div className="bg-purple w-full">
      <RichText className="text-white mt-[34px] w-full" field={props?.fields?.SubscribeText} />
      {text && link ? (
        isInternalLink ? (
          <Link
            field={props?.fields?.CTA}
            className="bg-aubergine grid md:flex md:w-[140px] text-center w-full hover:bg-extralightPurple hover:text-black pt-5 pb-5 pl-7.75 pr-7.75 tracking-[0.56px] text-white font-arial font-bold text-[14px] leading-normal rounded-xxl  mt-[45px] md:mt-[16px] md:min-w-[140px] md:min-h-[53px] md:max-h-[53px] min-h-[64px] justify-center items-center transition ease-in-out delay-100"
            onClick={() => handleCtaClick()}
          />
        ) : (
          <Link
            field={props?.fields?.CTA}
            target="_blank"
            className="bg-aubergine grid md:flex md:w-[140px] text-center w-full hover:bg-extralightPurple hover:text-black pt-5 pb-5 pl-7.75 pr-7.75 tracking-[0.56px] text-white font-arial font-bold text-[14px] leading-normal rounded-xxl  mt-[45px] md:mt-[16px] md:min-w-[140px] md:min-h-[53px] md:max-h-[53px] min-h-[64px] justify-center items-center transition ease-in-out delay-100"
            onClick={() => handleCtaClick()}
          />
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default Subscribe;
