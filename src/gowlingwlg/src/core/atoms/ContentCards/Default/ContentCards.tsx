import { useState, useEffect, useMemo } from 'react';
import {
  useSitecoreContext,
  RichText as JssRichText,
  withDatasourceCheck,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'src/core/atoms/Image';
import Slider from 'react-slick';
import { ContentCardsProps, ContentCardsType } from '../contentCard.types';

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
  const contentCards = useMemo(() => {
    const allContentCards = fields?.data?.datasource?.featuredContentCards?.targetItems || [];
    return allContentCards.slice(0, 3);
  }, [fields?.data?.datasource?.featuredContentCards?.targetItems]);
  const [isCarousel, setIsCarousel] = useState(false);
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth > 991;
      setIsCarousel(!isDesktop);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isCarousel) {
    const columnClass = getGridColumnClass(contentCards.length);

    return (
      <>
        {(contentCards || isEditing) && (
          <div className="grid bg-extraLightGrey p-[1.375rem] lg:py-[5rem]">
            <div
              className={`grid-cols-${columnClass} grid gap-4 max-w-[75rem] 2xl:max-w-[90rem] mx-auto`}
            >
              {contentCards.map((card: ContentCardsType) => (
                <div key={card.id} className="bg-white hover:shadow-custom">
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
                    <div className="lg:py-[2.5rem] px-[1.875rem]">
                      <div className="lg:mb-[1.25rem] flex items-center">
                        <Image
                          field={card?.pageType?.jsonValue?.fields?.Icon}
                          className="mr-[0.688rem] w-[1.625rem]"
                        />
                        <Text
                          tag="span"
                          field={card?.pageType?.jsonValue?.fields?.PageType}
                          className="text-darkBlue text-[1rem] font-bold leading-normal lg:mr-[0.688rem] text-center"
                        />
                      </div>
                      <Text
                        tag="h3"
                        field={card?.title}
                        className="font-bold font-arial leading-normal text-black text-[1.5rem] mb-[0.938rem]"
                      />
                      <JssRichText field={card?.summary} className="text-black leading-[156%]" />
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
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <span className="slick-prev" />,
    nextArrow: <span className="slick-next" />,
  };

  const overrideStyles = `
    .slick-prev:before,
    .slick-next:before {
      content: '';
    }
  `;
  return (
    <>
      {(contentCards || isEditing) && (
        <div className="carousel bg-extraLightGrey py-[2.5rem] px-[1.25rem] relative contentcards-react-slick-container">
          <style>{overrideStyles}</style>
          <Slider {...settings}>
            {contentCards.map((card: ContentCardsType) => (
              <div key={card.id}>
                <a
                  onClick={() =>
                    handleCardClick(
                      card?.pageType?.jsonValue?.fields?.PageType?.value,
                      card?.url?.url,
                      card?.title?.value
                    )
                  }
                  href={card?.url?.url}
                  className="block px-1"
                >
                  <div className="py-[2.5rem] px-[1.875rem] mb-[1.25rem] bg-white">
                    <div className="mb-[1.25rem] flex items-center">
                      <Image
                        field={card?.pageType?.jsonValue?.fields?.Icon}
                        className="mr-[0.688rem] w-[1.625rem]"
                      />
                      <Text
                        tag="span"
                        field={card?.pageType?.jsonValue?.fields?.PageType}
                        className="text-darkBlue text-[1rem] font-bold leading-normal lg:mr-[0.688rem] text-center"
                      />
                    </div>
                    <Text
                      tag="h3"
                      field={card?.title}
                      className="font-bold font-arial text-black leading-normal text-[1.5rem] mb-[0.938rem]"
                    />
                    <JssRichText field={card?.summary} className="text-black leading-[156%]" />
                  </div>
                </a>
              </div>
            ))}
          </Slider>
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
