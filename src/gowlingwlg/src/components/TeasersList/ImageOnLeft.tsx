import { Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { TeaserProps } from './Teasers.types';
import Image from 'core/atoms/Image';

const ImageOnLeft = (props: TeaserProps) => {
  return (
    <div className="px-[3.75rem]" data-testid="image-on-left">
      {props?.fields?.SelectedTeasers?.map((teaser) => {
        return (
          <div
            key={teaser.id}
            className="group flex  gap-[2.875rem] md:[&:not(:last-child)]:border-b-[0.063rem] border-darkGrey border-solid pb-[1.563rem] pt-[1.563rem]"
          >
            <a href={teaser?.url} className="flex gap-[2.875rem]">
              <Image
                field={teaser?.fields?.Image}
                className="hidden md:block group-hover:shadow-custom h-[8.75rem]"
              />
              <div>
                <Text
                  tag="h4"
                  field={teaser?.fields?.Title}
                  className="text-[1.5rem] tracking-[0rem] mb-[0.75rem] font-arial font-bold hover:font-bold leading-normal group-hover:font-bold text-black"
                />
                <Text
                  tag="p"
                  field={teaser?.fields?.Description}
                  className="text-darkGrey pb-[0.25rem] mb-[0.75rem] leading-[156%]"
                />
                <Link
                  field={teaser?.fields?.CTA}
                  className="font-bold text-mainPurple leading-normal group-hover:text-black"
                />
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default ImageOnLeft;
