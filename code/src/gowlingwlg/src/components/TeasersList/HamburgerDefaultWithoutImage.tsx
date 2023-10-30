import { Text, Link } from '@sitecore-jss/sitecore-jss-react';
import { TeaserProps } from './Teasers.types';

const Teaser = (props: TeaserProps) => {
  return (
    <div data-testid="menu-teasers" className="md:pl-[0.875rem]">
      {props?.fields?.SelectedTeasers?.map((teaser) => {
        return (
          <div key={teaser.id} className="md:px-0 px-[1.375rem] md:p-[0] flex gap-[3.563rem]">
            <div className="w-[100%] md:w-[50%]">
              <Text
                className="md:text-[1.5rem] text-[2rem] leading-normal tracking-[0rem] font-arial md:mb-[0.75rem] mb-[1.063rem] group-hover:font-semibold md:font-bold font-normal text-white md:text-black grow"
                tag="h4"
                field={teaser?.fields?.Title}
              />
              <Text
                className="text-base text-white md:text-darkGrey md:mb-[0.75rem] mb-[0.625rem] leading-[156%]"
                tag="p"
                field={teaser?.fields?.Description}
              />
              <div className="flex items-center">
                <Link
                  className="font-bold leading-normal text-white md:text-mainPurple md:hover:text-black"
                  field={teaser?.fields?.CTA}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Teaser;
