import React, { useState, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import { AuthorProps } from './types';
import PersonCard from 'core/molecules/PersonCard/PersonCard';
import Head from 'next/head';
import { useI18n } from 'next-localization';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const styleForTwoTile = 'md:w-[calc(50%-10px)] xl:w-[calc(50%-15px)]';
const styleForFourTile = 'md:w-[calc(25%-10px)] print:w-[calc(50%-10px)] xl:w-[calc(25%-15px)]';

const Slider = dynamic(() => import('react-slick').then((m) => m.default), {
  ssr: false,
});

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const AuthorCards = (props: AuthorProps): JSX.Element => {
  const { t } = useI18n();
  const maxSlides = props?.params?.CarouselConversionLimit || 5;
  const authors = props?.fields?.data?.item?.KeyContacts?.targetItems?.map((item) => {
    return item?.alternateTitle?.jsonValue?.value;
  });
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const [width] = useWindowSize();

  const filteredItems = props.fields.data.item.KeyContacts.targetItems.filter((item) => {
    const hasItemContent =
      item.profileImage?.jsonValue.value?.src ||
      item.alternateTitle?.jsonValue?.value ||
      item.professionalTitle?.targetItem?.title.jsonValue?.value ||
      item.role?.value ||
      item.offices?.targetItems.length ||
      isEditing;

    return hasItemContent;
  });

  if (filteredItems.length === 0) {
    return <></>;
  }

  const hasValues = props?.fields?.data?.item?.KeyContacts?.targetItems?.length;

  if (hasValues === 0) {
    return <></>;
  }

  return (
    <>
      <Head>
        <meta name="authors" content={authors?.toString()} />
      </Head>
      <div
        data-testid="author-card"
        className={`max-w-[1200px] 2xl:max-w-[1440px] m-auto pt-[61px] pb-[5rem] md:pb-[6.13rem] 2xl:px-0 author-card md:mx-[2.125rem] xl:m-auto ${
          width < 768 && props?.fields?.data?.item?.KeyContacts?.targetItems?.length > maxSlides
            ? 'pb-[80px]'
            : ''
        }`}
      >
        <div className=" text-aubergine px-[22px] pb-[26px] font-gowlingBliss text-[32px] md:text-[48px] font-bold leading-normal md:leading-[60px] tracking-[-0.64px] md:tracking-[-0.48px] md:px-[0px] ">
          {props.params.OverrideTitle ? props.params.OverrideTitle : t('KeyContacts')}
        </div>
        {width < 768 && filteredItems.length > maxSlides ? (
          <Slider {...settings}>
            {filteredItems.map((item, index) => {
              return props.params.FieldNames == 'TwoAuthorCardsInOneRow' ? (
                <PersonCard key={index} {...item} styleClassName={styleForTwoTile} />
              ) : (
                <PersonCard key={index} {...item} styleClassName={styleForFourTile} />
              );
            })}
          </Slider>
        ) : (
          <div className="flex flex-wrap gap-[20px]">
            {props?.fields?.data?.item?.KeyContacts?.targetItems?.map((item, index) => {
              return props.params.FieldNames == 'TwoAuthorCardsInOneRow' ? (
                <PersonCard key={index} {...item} styleClassName={styleForTwoTile} />
              ) : (
                <PersonCard key={index} {...item} styleClassName={styleForFourTile} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default AuthorCards;
