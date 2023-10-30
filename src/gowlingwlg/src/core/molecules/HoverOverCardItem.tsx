import { hoverOverCardsType } from 'components/HoverOverCards/hoverOverCards.types';
import { Image, RichText as JssRichText, Link } from '@sitecore-jss/sitecore-jss-nextjs';
interface DataLayerEvent {
  event: string;
  content_title?: string;
  content_link?: string | undefined;
}

const HoverOverCardItem = (hoverCard: hoverOverCardsType) => {
  const contentSectionClick = (title: string, contentlink: string | undefined) => {
    const eventData: DataLayerEvent = {
      event: 'content_section_click',
      content_title: title,
      content_link: contentlink,
    };
    window.dataLayer.push(eventData);
  };

  const hasValue =
    hoverCard.Image.jsonValue.value?.src != undefined || hoverCard.Title.jsonValue.value.length;
  if (!hasValue) {
    return <></>;
  }

  return (
    <div className="bg-maroon md:bg-white relative w-full h-full group  hover:shadow-overlay transition-shadow duration-500 z-[1]">
      <Image
        field={hoverCard?.Image?.jsonValue}
        className="block w-full h-[13rem] object-cover min-h-[13rem]"
      />
      {hoverCard?.CTALink?.jsonValue?.value?.href != '' &&
      hoverCard?.Title?.jsonValue?.value != '' ? (
        <Link
          className="text-black font-arial text-2xl font-bold hidden md:block leading-normal py-[58px] px-[30px] "
          field={{
            ...hoverCard?.CTALink?.jsonValue?.value,
            text: hoverCard?.Title?.jsonValue?.value,
          }}
        />
      ) : (
        <div className="text-black font-arial text-2xl font-bold hidden md:block leading-normal py-[58px] px-[30px] bg-white">
          {hoverCard?.Title?.jsonValue?.value}
        </div>
      )}

      <div className="md:absolute  md:bottom-0 md:left-0 md:right-0 bg-maroon  overflow-hidden transition-all duration-500 md:h-0 md:group-hover:h-full">
        <div className="text-white  text-2xl py-[40px] px-[30px] md:absolute inset-0  justify-center transform translate-y-0 transition-transform duration-500">
          {hoverCard?.CTALink?.jsonValue?.value?.href != '' &&
          hoverCard?.Title?.jsonValue?.value != '' ? (
            <Link
              className="text-white font-arial text-2xl font-bold leading-normal block pb-4 "
              field={{
                ...hoverCard?.CTALink?.jsonValue?.value,
                text: hoverCard?.Title?.jsonValue?.value,
              }}
              onClick={() =>
                contentSectionClick(
                  hoverCard?.Title?.jsonValue?.value,
                  hoverCard?.CTALink?.jsonValue?.value?.href
                )
              }
            />
          ) : (
            <div className="ttext-white font-arial text-2xl font-bold leading-normal block pb-4">
              {hoverCard?.Title?.jsonValue?.value}
            </div>
          )}
          <JssRichText
            field={{
              ...hoverCard?.Description?.jsonValue,
              value: hoverCard?.Description?.jsonValue?.value.slice(0, 300),
            }}
            className="text-white text-base font-normal leading-normal "
          />
        </div>
      </div>
    </div>
  );
};

export default HoverOverCardItem;
