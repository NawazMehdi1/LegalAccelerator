import { useMemo } from 'react';
import {
  useSitecoreContext,
  withDatasourceCheck,
  Image as JssImage,
  Text,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'src/core/atoms/Image';
import { ContentCardsProps, ContentCardsType } from '../contentCard.types';
import { newFormatDate } from 'core/utils/formatDate';

declare global {
  interface Window {
    contentCardDataLayer: DataLayerEvent[];
  }
}

interface DataLayerEvent {
  event: string;
  content_type?: string;
  content_title?: string;
  content_link: string;
}
const handleCardClick = (title: string, article: string, url: string) => {
  const eventData: DataLayerEvent = {
    event: 'content_card_click',
    content_type: title,
    content_title: article,
    content_link: url,
  };
  window.dataLayer.push(eventData);
};

const ContentCards = ({ fields }: ContentCardsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const contentCards = useMemo(() => {
    const allContentCards = fields?.data?.datasource?.featuredContentCards?.targetItems || [];
    return allContentCards.slice(0, 3);
  }, [fields?.data?.datasource?.featuredContentCards?.targetItems]);
  const columnClass = getGridColumnClass(contentCards.length);
  return (
    <>
      {(contentCards || isEditing) && (
        <div className="grid">
          <div
            className={`md:grid-cols-${columnClass} grid gap-4 md:gap-y-0 gap-y-[1.875rem] max-w-[75rem] 2xl:max-w-[90rem] mx-auto`}
          >
            {contentCards.map((card: ContentCardsType) => (
              <div
                key={card.id}
                className="md:w-full w-[11.875rem] md:hover:shadow-custom md:p-[0.313rem]"
              >
                <a
                  href={card?.url?.url}
                  className="h-full block"
                  onClick={() =>
                    handleCardClick(
                      card?.pageType?.jsonValue?.fields?.PageType?.value,
                      card?.title?.value,
                      card?.url?.url
                    )
                  }
                >
                  <div className="">
                    <RichText
                      field={fields?.data?.datasource?.title}
                      className="md:text-black text-white font-bold leading-normal mb-[0.625rem]"
                    />
                    <JssImage
                      field={card?.image?.jsonValue}
                      className="h-[7.688rem] mb-[1.25rem] w-full object-cover"
                    />
                    <div className="mb-[0.625rem] flex items-center">
                      <Image
                        field={card?.pageType?.jsonValue?.fields?.Icon}
                        className="mr-[0.625rem] w-[1.625rem] max-[991px]:invert max-[991px]:brightness-0"
                      />
                      <Text
                        tag="span"
                        field={card?.pageType?.jsonValue?.fields?.PageType}
                        className="md:text-mainPurple text-left text-white text-[1rem] font-bold leading-normal"
                      />
                    </div>
                    <p className="md:text-black mb-[0.625rem] text-white text-[0.625rem] leading-[140%]">
                      {newFormatDate(
                        card?.publishedDate?.jsonValue?.value as unknown as string,
                        sitecoreContext.language as unknown as string
                      )}
                    </p>
                    <Text
                      tag="h3"
                      field={card?.title}
                      className="md:font-bold font-normal font-arial md:leading-normal leading-[156%] md:text-black text-white text-[1rem]"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
          <style jsx>{`
            .grid-cols-1 {
              grid-template-columns: 1fr;
              display: grid;
              grid-gap: 1rem;
            }
            .grid-cols-2 {
              grid-template-columns: repeat(2, 1fr);
              display: grid;
              grid-gap: 1rem;
            }
            .grid-cols-3 {
              grid-template-columns: repeat(3, 1fr);
              display: grid;
              grid-gap: 1rem;
            }
            .expanded {
              grid-column: span ${columnClass === 2 ? 2 : 3};
            }
          `}</style>
        </div>
      )}
    </>
  );
};

function getGridColumnClass(numCards: number): number {
  if (numCards === 1) {
    return 1;
  } else if (numCards === 2) {
    return 2;
  } else {
    return 3;
  }
}

export default withDatasourceCheck()<ContentCardsProps>(ContentCards);
