import { Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { LinkListItemProps } from '../LinkList.types';

const LinkListItem = ({ field }: LinkListItemProps) => {
  return (
    <div className="flex justify-start font-arial text-base font-normal leading-[156%] text-black lg:flex lg:justify-center gap-x-26 md:px-6  lg:gap-x-87  gap-y-27 py-[10px] md:p-3">
      <JssLink
        field={field}
        className="hover:text-black hover:text-shadow-black transition ease-in-out delay-100"
      />
    </div>
  );
};

export default LinkListItem;
