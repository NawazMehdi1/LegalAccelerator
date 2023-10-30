import { useState, useEffect } from 'react';
import { useSitecoreContext, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import Slider from 'react-slick';

import { VideoSeriesProps, SliderCardsType } from '../../core/atoms/VideoTile/VideoTile.types';
import VideoTiles from '../../core/atoms/VideoTile/VideoTile';
import Link from 'next/link';

const VideoSeries = (props: VideoSeriesProps): JSX.Element => {
  const contentCards = props?.fields?.data?.item?.series?.targetItems;
  const [isCarousel, setIsCarousel] = useState(false);
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const numCards = VideoSeries.length;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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
  }, [numCards]);

  const hasValues = props?.fields?.data?.item?.series?.targetItems?.length;

  if (hasValues === 0) {
    return <></>;
  }

  if (!isCarousel) {
    return (
      <>
        {(contentCards || isEditing) && (
          <div className="grid max-w-[1200px] 2xl:max-w-[1440px] xl:m-auto px-[15px] xl:px-0 pt-[40px] sm:pt-[98px] pb-[80px]">
            <div className="w-full flex items-center justify-between content-between mb-5">
              <h4> {props?.fields?.data?.item?.name} </h4>
              {props?.fields?.data?.item?.series?.targetItems.length > 4 && (
                <Link href={props?.fields?.data?.item?.SeeAllCTA?.jsonValue?.value?.href || '#'}>
                  {props?.fields?.data?.item?.SeeAllCTA?.jsonValue?.value?.text}
                </Link>
              )}
            </div>
            <div className={`flex flex-wrap -mx-2`}>
              {props?.fields?.data?.item?.series?.targetItems
                .slice(0, 4)
                .map((card: SliderCardsType, index: number) => (
                  <div key={index} className="w-1/4  px-2 min-h-max">
                    <VideoTiles {...card} />
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {(contentCards || isEditing) && (
        <div className="carousel series-slider w-full pt-[40px] pb-[80px] px-[15px] relative max-w-[1200px] 2xl:max-w-[1440px] xl:m-auto xl:px-0">
          <div className="w-full flex items-center justify-between content-between mb-5">
            <h4> {props?.fields?.data?.item?.name} </h4>
            {props?.fields?.data?.item?.series?.targetItems.length > 4 && (
              <Link href={props?.fields?.data?.item?.SeeAllCTA?.jsonValue?.value?.href || '#'}>
                {props?.fields?.data?.item?.SeeAllCTA?.jsonValue?.value?.text}
              </Link>
            )}
          </div>

          <Slider {...settings}>
            {props?.fields?.data?.item?.series?.targetItems.map(
              (card: SliderCardsType, index: number) => (
                <div key={index} className="w-1/4  px-2 min-h-max h-full">
                  <VideoTiles {...card} />
                </div>
              )
            )}
          </Slider>
        </div>
      )}
    </>
  );
};

export default withDatasourceCheck()<VideoSeriesProps>(VideoSeries);
