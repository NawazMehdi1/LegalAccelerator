import React from 'react';
import { Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { TeaserProps } from './Teasers.types';

const TwoColumn = (props: TeaserProps) => {
  return (
    <div className="md:pl-[0.875rem] md:px-[0] grid md:grid-cols-1 md:mt-0 grid-flow-row auto-rows-max md:gap-[2.5rem] gap-[1.875rem]">
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
              className="text-white md:text-black leading-[156%] md:mb-[0.938] mb-[0.625rem]"
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
