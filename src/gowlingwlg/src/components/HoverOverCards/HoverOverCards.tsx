import React from 'react';
import { HoverOverCardsTypes, carouselSettings } from './hoverOverCards.types';
import { Text, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';
import HoverOverCardItem from 'core/molecules/HoverOverCardItem';
import Slider from 'react-slick';
import RightBottomCircle from '../../core/atoms/Icons/RightBottomCircle';

const HoverOverCards = ({ fields }: HoverOverCardsTypes) => {
  const field = fields?.data?.datasource;

  let hasValue = 0;
  for (let i = 0; i < field.children.results.length; i++) {
    if (
      field.children.results[i].Title.jsonValue.value != '' ||
      field?.children?.results[i]?.Image?.jsonValue?.value?.asset != null
    ) {
      hasValue = i + 1;
      break;
    }
  }

  return (
    hasValue && (
      <div className=" bg-extraLightGrey pb-[133px] relative">
        <div className="max-w-[1200px] 2xl:max-w-[1440px] mx-[22px] md:mx-[75px]  xl:m-auto  pt-[65px] ">
          <div className="flex md:items-center  gap-x-[100px] flex-col md:flex-row ">
            <Text
              field={field?.Title?.jsonValue}
              className="lg:max-w-[450px] text-[32px] text-black md:text-[48px] tracking-[-0.96px] mb-[26px] md:mb-0 leading-normal "
              tag="h3"
            />
            <JssRichText
              field={field?.Description?.jsonValue}
              tag="p"
              className=" lg:max-w-[530px] text-black mb-[26px] md:mb-0 font-arial text-base font-normal leading-[156%]"
            />
          </div>
          <div className="block lg:hidden sector-react-slick-container">
            <Slider {...carouselSettings}>
              {field?.children?.results?.map((hoverCard, index) => (
                <HoverOverCardItem key={index} {...hoverCard} />
              ))}
            </Slider>
          </div>
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-5 mt-[65px] ">
              {field?.children?.results?.map((hoverCard, index) => {
                if (hoverCard.Image && hoverCard.Title) {
                  return <HoverOverCardItem key={index} {...hoverCard} />;
                }
                return null;
              })}
            </div>
          </div>

          <div className="hidden lg:block absolute bottom-0 right-0  z-0 scale-[0.85] xl:scale-[0.92] origin-bottom-right">
            <RightBottomCircle />
          </div>
        </div>
      </div>
    )
  );
};

export default HoverOverCards;
