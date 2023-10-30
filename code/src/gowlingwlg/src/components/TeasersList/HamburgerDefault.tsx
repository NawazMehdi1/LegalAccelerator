import { Text, Link } from '@sitecore-jss/sitecore-jss-react';
import { TeaserProps } from './Teasers.types';
import Image from 'core/atoms/Image';

const Teaser = (props: TeaserProps) => {
  return (
    <div data-testid="menu-teasers" className="md:pl-[0.875rem]">
      {props?.fields?.SelectedTeasers?.map((teaser) => {
        return (
          <div key={teaser.id} className="md:px-0 px-[1.25rem] md:p-[0] flex gap-[3.563rem]">
            <div className="w-[100%] md:w-[50%]">
              <Text
                className="text-[1.5rem] leading-normal tracking-[0rem] font-arial mb-[0.75rem] group-hover:font-semibold text-white md:text-black grow"
                tag="h4"
                field={teaser?.fields?.Title}
              />
              <Text
                className="text-base text-white md:text-darkGrey mb-[0.625rem] leading-[156%]"
                tag="p"
                field={teaser?.fields?.Description}
              />
              <Link
                className="font-bold leading-normal text-white md:text-mainPurple md:hover:text-black"
                field={teaser?.fields?.CTA}
              />
            </div>
            <Image field={teaser?.fields?.Image} className="hidden md:block md:mb-[1.375rem]" />
          </div>
        );
      })}
    </div>
  );
};
export default Teaser;
