import { Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { LinkListItemProps } from './LinkList.types';

const LinkListItem = ({ field }: LinkListItemProps) => {
  return (
    <JssLink
      field={field}
      className="hover:text-mainPurple hover:font-bold text-aubergine leading-[120%] text-[18px] font-arial font-bold transition-all"
    />
  );
};

export default LinkListItem;
