import { Link, LinkField, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useRouter } from 'next/navigation';
import Image from 'core/atoms/Image';
import TeaserArrowLeftIcon from 'core/atoms/Icons/TeaserArrowLeftIcon';
import TeaserArrowRightIcon from 'core/atoms/Icons/TeaserArrowRightIcon';
import Slider, { Settings } from 'react-slick';
import { useRef, useState } from 'react';

interface FieldValue<T> {
  value: T;
}

interface SelectedTeaser {
  id: string;
  displayName: string;
  fields: {
    Title: FieldValue<string>;
    Description: FieldValue<string>;
    CTA: LinkField;
    Image: {
      value: {
        src: string;
        alt: string;
        height: string;
        width: string;
      };
    };
  };
  name: string;
  url: string;
}

declare global {
  interface Window {
    feturedCarouselDataLayer: DataLayerEvent[];
  }
}

interface DataLayerEvent {
  event: string;
  carousel_title?: string | string[];
  carousel_link: string;
}

type TeaserProps = ComponentProps & {
  fields: {
    SelectedTeasers: SelectedTeaser[];
    Title?: FieldValue<string>;
    Description?: FieldValue<string>;
  };
};

const settings: Settings = {
  autoplay: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: <TeaserArrowRightIcon height={32} width={18} />,
  prevArrow: <TeaserArrowLeftIcon height={32} width={18} />,
  arrows: false,
};

const Teaser = (props: TeaserProps): JSX.Element => {
  const router = useRouter();
  const sliderRef = useRef<Slider>(null);
  const teaserTitles =
    props.fields?.SelectedTeasers?.map((teaser) => teaser?.fields?.Title?.value) || [];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleCarouselClick = (event: string, title: string | string[], url: string) => {
    const eventData: DataLayerEvent = {
      event,
      carousel_title: title,
      carousel_link: url,
    };
    window.dataLayer.push(eventData);
  };

  const handleDotClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);

      const currentTeaserTitle = teaserTitles[index];

      handleCarouselClick('news_carousel_nav_click', currentTeaserTitle, 'Dot Click');
      setCurrentSlideIndex(index);
    }
    if (index < currentSlideIndex) {
      setIsHighlighted(true);
    } else {
      setIsHighlighted(false);
    }
  };

  const onClickNext = () => {
    sliderRef.current?.slickNext();
    if (sliderRef.current) {
      const newSlideIndex = (currentSlideIndex + 1) % teaserTitles.length;
      sliderRef.current.slickNext();
      setCurrentSlideIndex(newSlideIndex);

      const currentTeaserTitle = teaserTitles[newSlideIndex];

      handleCarouselClick('news_carousel_nav_click', currentTeaserTitle, 'Forward');
    }
    setIsHighlighted(false);
  };
  const onClickPrev = () => {
    sliderRef.current?.slickPrev();
    if (sliderRef.current) {
      const newSlideIndex = (currentSlideIndex - 1 + teaserTitles.length) % teaserTitles.length;
      setCurrentSlideIndex(newSlideIndex);

      const currentTeaserTitle = teaserTitles[newSlideIndex];

      handleCarouselClick('news_carousel_nav_click', currentTeaserTitle, 'Backward');
    }
    setIsHighlighted(true);
  };

  const onClickTile = (url: string | undefined) => {
    if (url) {
      router.push(url);
    }
  };

  return (
    <div className="w-[100%] max-w-[539px] m-auto xl:max-w-[1200px] 2xl:max-w-[1440px] lg:py-[74px] overflow-hidden">
      <div className="flex font-arial group lg:hover:shadow-[2px_7px_5px_rgba(0,0,0,0.3)] transition-all">
        <div className="hidden w-[57px] xl:flex xl:flex-col cursor-pointer">
          <button
            className="bg-maroon h-[50%] flex justify-center items-center text-white hover:brightness-75 w-[57px] transition-all"
            aria-label="Carousel back button"
            title="Carousel back button"
            onClick={onClickPrev}
          >
            <TeaserArrowRightIcon height={32} width={18} />
          </button>
          <button
            className="bg-extralightPurple h-[50%] flex justify-center items-center text-white hover:brightness-75 w-[57px] transition-all"
            onClick={onClickNext}
            title="Carousel forward button"
            aria-label="Carousel forward button"
          >
            <TeaserArrowLeftIcon height={32} width={18} />
          </button>
        </div>

        <Slider {...settings} className="flex font-arial w-[100%]" ref={sliderRef}>
          {props.fields?.SelectedTeasers?.map((selectedTeaser, selectedTeaserIndex) => {
            const isDescrriptionLessThanLimit =
              selectedTeaser?.fields?.Description?.value.length <= 130;
            return (
              <div
                key={selectedTeaser?.id}
                onClick={() => onClickTile(selectedTeaser?.fields?.CTA?.value?.href)}
                className="h-full"
              >
                <div
                  className="flex flex-col xl:flex-row cursor-pointer bg-white h-full"
                  onClick={() => {
                    if (selectedTeaser?.fields?.Title?.value && selectedTeaser.url) {
                      handleCarouselClick(
                        'news_carousel_click',
                        selectedTeaser?.fields?.Title?.value,
                        selectedTeaser.url
                      );
                    }
                  }}
                  style={{ display: 'flex' }}
                >
                  <div className="flex h-[inherit] flex-col sm:max-w-[539px] relative bg-white xl:max-w-[639px] 2xl:max-w-[846px] lg:hover:shadow-[2px_7px_5px_rgba(0,0,0,0.3)]">
                    <div className="pb-[38.6px] pt-[30px] pl-27 pr-[60px] xl:pl-[60px] xl:pr-[40px] xl:pt-[60px] xl:pb-[50.37px] min-h-[212px] xl:min-h-[316px]">
                      <h4
                        className={`xl:header-3 text-black leading-normal md:tracking-[-0.96px] tracking-[-0.64px] md:mb-0 mb-[10px]  overflow-hidden text-ellipsis  nextanimation ${`img-content ${
                          !isHighlighted ? '' : 'prevanimation'
                        }`}`}
                      >
                        {selectedTeaser?.fields?.Title?.value}
                      </h4>
                      <div>
                        <p className="xl:subtitle text-black leading-[156%] md:leading-[143%]  tracking-[-0.24px] md:font-normal min-h-[96px] inline">
                          {isDescrriptionLessThanLimit
                            ? selectedTeaser?.fields?.Description?.value
                            : selectedTeaser?.fields?.Description?.value.slice(0, 130) + '...'}
                        </p>
                        <Link
                          field={selectedTeaser?.fields?.CTA}
                          className="!text-darkBlue font-bold xl:subtitle xl:font-bold leading-[156%] md:leading-[143%]  tracking-[-0.24px] inline ml-[0.625rem]"
                        />
                      </div>
                      <div className=" gap-x-3 flex pt-[35px] lg:pt-[30px]">
                        {props.fields?.SelectedTeasers?.map((item, index) => {
                          return (
                            <div
                              className={`rounded-full h-2 w-2 xl:h-4 xl:w-4 md:w-3 md:h-3 mr-3 xl:mr-5 ${
                                index === selectedTeaserIndex ? 'bg-maroon' : 'bg-mediumGrey'
                              }`}
                              key={item.id}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDotClick(index);
                              }}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-[100vw] md:max-w-[539px] sm:min-h-[316px] min-h-[188px] ee-hide-link-description   nextanimation ${`img-content ${
                      isHighlighted ? 'prevanimation' : ''
                    }`}`}
                  >
                    <Link field={selectedTeaser?.fields?.CTA}>
                      <Image
                        field={selectedTeaser?.fields?.Image}
                        className="object-cover w-[100%] h-[188px] sm:h-[100%] max-w-[539px]"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<TeaserProps>(Teaser);
