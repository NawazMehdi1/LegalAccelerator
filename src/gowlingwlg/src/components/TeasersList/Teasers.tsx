import { Text, Link } from '@sitecore-jss/sitecore-jss-react';
import { TeaserProps } from './Teasers.types';
import Image from 'core/atoms/Image';

const Teaser = (props: TeaserProps) => {
  return (
    <div data-testid="menu-teasers" className="px-[5rem] py-[2.06rem]">
      {props?.fields?.SelectedTeasers?.map((teaser) => {
        return (
          <div key={teaser.id} className="px-[22px] md:p-[0] flex gap-[16px] mb-[24px]">
            <div className="w-[100%] md:w-[50%]">
              <Text
                className="text-2xl mb-[16px] group-hover:font-semibold text-white md:text-black grow"
                tag="h4"
                field={teaser?.fields?.Title}
              />
              <Text
                className="text-base text-white md:text-darkGrey mb-[10px]"
                tag="p"
                field={teaser?.fields?.Description}
              />
              <Link
                className="font-semibold text-white md:text-mainPurple md:group-hover:text-black"
                field={teaser?.fields?.CTA}
              />
            </div>
            <Image field={teaser?.fields?.Image} />
          </div>
        );
      })}
    </div>
  );
};
export default Teaser;
