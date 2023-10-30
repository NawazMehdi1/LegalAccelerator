import {
  Text,
  Link as JssLink,
  RichText as JssRichText,
  withDatasourceCheck,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import RightArrowIcon from 'core/atoms/Icons/RightArrowIcon';
import { ContentTeaserProps } from './types';

declare global {
  interface Window {
    dataLayerStartConversation: DataLayerEvent[];
  }
}

interface DataLayerEvent {
  event: string;
  tab_title?: string;
  tab_link?: string;
}
const ContentTeaser = ({ fields }: ContentTeaserProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const hasValues =
    fields?.Title?.value || fields?.Description?.value || fields?.CTAList?.length || isEditing;
  if (!hasValues) {
    return <></>;
  }
  const handleAccordionClick = (title: string, link: string) => {
    const eventData: DataLayerEvent = {
      event: 'start_the_conversation_click',
      tab_title: title,
      tab_link: link,
    };
    window.dataLayer.push(eventData);
  };

  return (
    <section className="bg-white ">
      <div className="py-[22px] grid grid-cols-12 gap-y-[35px] gap-x-[5px] md:gap-[45px] max-w-[1200px] 2xl:max-w-[1440px] mx-[22px] md:mx-[34px] xl:m-auto col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
        <div className="col-span-12 xl:col-span-6 ">
          <Text
            tag="h2"
            field={fields?.Title}
            className="text-black text-[32px] md:text-[60px] font-gowlingBliss tracking-[-0.64px] md:tracking-[-1.2px] font-bold leading-normal"
          />

          <JssRichText
            field={fields?.Description}
            className="text-black mt-[15px] mb-[34px] text-base font-arial font-normal leading-[156%] tracking-[-0.16px] "
          />

          {fields?.CTAList.length ? (
            <div className="grid grid-cols-12 w-full gap-x-[20px] ee-hide-link-description">
              {fields?.CTAList?.slice(0, 2)?.map((tile, index) =>
                tile?.fields?.Link?.value?.href ? (
                  <JssLink
                    className="justify-self-stretch col-span-12 md:col-span-6 cursor-pointer [&:not(:first-child)]:mt-[25px] md:[&:not(:first-child)]:mt-[0px] flex row items-stretch content-stretch min-h-[143px]"
                    key={`${index}-content-teaser`}
                    field={tile?.fields?.Link}
                    showLinkTextWithChildrenPresent={false}
                    onClick={() => {
                      if (tile?.fields?.Title?.value && tile?.fields?.Link?.value?.href) {
                        handleAccordionClick(tile.fields.Title.value, tile.fields.Link.value.href);
                      }
                    }}
                  >
                    <div className="flex flex-col bg-extraLightGrey [&>div.heading]:hover:text-shadow-black  pl-[30px] pr-[10px] py-[40px] flex-1  gap-y-[11px] h-full min-h-[143px]">
                      <div className="text-black heading text-[24px] font-arial leading-normal font-normal">
                        <Text field={tile?.fields?.Title} />
                      </div>
                      <div className="text-base font-arial font-normal leading-[114%]">
                        <JssRichText
                          field={tile?.fields?.Description}
                          className="text-black text-base font-arial font-normal leading-[156%] tracking-[-0.16px] "
                        />
                      </div>
                    </div>

                    <div
                      className={`max-h-[414px] grid ${
                        index % 2 === 0
                          ? 'bg-extralightPurple hover:bg-[#AB8FAA]'
                          : 'bg-maroon hover:bg-darkMaroon'
                      }   transition-all ease-in-out delay-150 place-content-center min-w-[60px] min-h-[143px]`}
                    >
                      <RightArrowIcon />
                    </div>
                  </JssLink>
                ) : (
                  <div
                    className="justify-self-stretch col-span-12 md:col-span-6  cursor-pointer [&:not(:first-child)]:mt-[25px] md:[&:not(:first-child)]:mt-[0px] flex row items-stretch content-stretch min-h-[143px]"
                    key={`${index}-content-teaser`}
                  >
                    <div className="flex flex-col bg-extraLightGrey [&>div.heading]:hover:font-bold  pl-[30px] pr-[10px] py-[40px] flex-1  gap-y-[11px] h-full min-h-[143px]">
                      <div className="text-aubergine heading text-[24px] font-arial leading-[114%] font-normal transition-all ease-in delay-150">
                        <Text field={tile?.fields?.Title} />
                      </div>
                      <div className="text-aubergine text-base font-arial font-normal leading-[114%]">
                        <JssRichText
                          field={tile?.fields?.Description}
                          className="text-aubergine text-base font-arial font-normal leading-[156%] tracking-[-0.16px] "
                        />
                      </div>
                    </div>

                    <div
                      className={`max-h-[414px] grid ${
                        index % 2 === 0
                          ? 'bg-extralightPurple hover:bg-[#AB8FAA]'
                          : 'bg-maroon hover:bg-darkMaroon'
                      }   transition-all ease-in-out delay-150 cursor-pointer place-content-center min-w-[60px] min-h-[143px]`}
                    >
                      <RightArrowIcon />
                    </div>
                  </div>
                )
              )}
            </div>
          ) : null}
        </div>
        <div className="col-span-12  md:col-span-1" />
        <div className="col-span-12 hidden xl:block md:col-span-5  ">
          <Image field={fields?.Image} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<ContentTeaserProps>(ContentTeaser);
