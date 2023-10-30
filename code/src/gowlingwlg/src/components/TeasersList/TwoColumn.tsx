import React from 'react';
import { Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { TeaserProps } from './Teasers.types';

const TwoColumn = (props: TeaserProps) => {
  return (
    <div className="px-[1.375rem] md:mt-[3.563rem] md:mb-[2.5rem] md:pl-[0.875rem] mt-[1.875rem] md:px-[0] grid md:grid-cols-2 grid-flow-row auto-rows-max md:gap-[7.813rem] gap-[1.875rem]">
      {props?.fields?.SelectedTeasers?.map((teaser, index) => {
        return (
          <div key={`${index}-author-cards`}>
            <Text
              tag="h6"
              className="body-text font-bold leading-normal mb-[0.625rem] text-white md:text-black"
              field={teaser?.fields?.Title}
            />
            <Text
              tag="p"
              className="text-white md:text-black leading-[156%] md:mb-[0.938rem] mb-[0.625rem]"
              field={teaser?.fields?.Description}
            />
            <Link
              className="font-bold leading-normal text-white md:text-mainPurple md:hover:text-black"
              field={teaser?.fields?.CTA}
            />
          </div>
        );
      })}
    </div>
  );
};
export default TwoColumn;
