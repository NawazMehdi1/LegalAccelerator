import { Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { LinkListItemProps } from '../LinkList.types';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect, useState } from 'react';

const LinkListItem = (props: LinkListItemProps) => {
  const {
    sitecoreContext: { route },
  } = useSitecoreContext();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Check if the page was refreshed
    const pageRefreshed = localStorage.getItem('pageRefreshed') === 'true';

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Run the handleScroll function immediately if the page was refreshed
    if (pageRefreshed) {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll);

    // Set a flag in localStorage to indicate that the page has been refreshed
    localStorage.setItem('pageRefreshed', 'true');

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isNeedScrolling = route?.name == 'Home';

  return (
    <JssLink
      field={props.field}
      className={`px-10 md:pt-[0.781rem] leading-6 inline-block text-center overflow-hidden text-[16px] transition ${
        isNeedScrolling
          ? `${
              scrolling
                ? '!text-aubergine hover:text-shadow-black  ease-in-out delay-100'
                : '!text-white hover:text-shadow-white'
            }`
          : 'text-black hover:text-shadow-black'
      }`}
    />
  );
};

export default LinkListItem;
