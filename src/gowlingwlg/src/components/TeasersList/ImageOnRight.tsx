import { Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { TeaserProps } from './Teasers.types';
import Image from 'core/atoms/Image';

const ImageOnLeft = (props: TeaserProps) => {
  return (
    <div data-testid="image-on-right">
      {props?.fields?.SelectedTeasers?.map((teaser) => {
        return (
          <div key={teaser.id} className="group flex my-[24px] gap-[46px] border-solid pb-[24px]">
            <div>
              <Text
                tag="h4"
                field={teaser?.fields?.Title}
                className="text-2xl mb-[16px] font-normal"
              />
              <Text
                tag="p"
                field={teaser?.fields?.Description}
                className="text-darkGrey pb-[4px]"
              />
              <Link
                field={teaser?.fields?.CTA}
                className="font-bold text-mainPurple hover:text-black"
              />
            </div>
            <Image field={teaser?.fields?.Image} className="hidden lg:block" />
          </div>
        );
      })}
    </div>
  );
};
export default ImageOnLeft;
