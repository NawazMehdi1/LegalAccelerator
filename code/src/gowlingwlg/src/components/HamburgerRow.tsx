import React, { useState, useEffect, useRef } from 'react';
import HamburgerIcon from '../core/atoms/Icons/HamburgerIcon';
import CloseIcon from '../core/atoms/Icons/CloseIcon';
import Logo from '../core/atoms/Icons/Logo';
import RightArrowIcon from '../core/atoms/Icons/RightArrowIcon';
import BackArrow from '../core/atoms/Icons/BackArrow';

import {
  ComponentRendering,
  LinkField,
  Placeholder,
  useSitecoreContext,
  ComponentParams,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useAtom } from 'jotai';
import { hamburgerMenuVisibilityAtom } from '../core/molecule state/visibilityAtom';
import { HAMBURGER_SCROLL_GAP } from 'constants/ui';

type HamburgerMenuProps = {
  params: ComponentParams;
  componentName: string;
  fields: {
    items: {
      displayName: string;
      fields: {
        Link: LinkField;
        NavigationTitle: TextField;
      };
    }[];
  };
  rendering: ComponentRendering & { params: ComponentParams };
};

export const Default: React.FC = (props: HamburgerMenuProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const [isOpen, setIsOpen] = useState(false);
  const [SubmenuIsOpen, setSubmenuIsOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [isHamburgerMenuVisible] = useAtom(hamburgerMenuVisibilityAtom);

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

  const isNeedScrolling = sitecoreContext.route?.name == 'Home';

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName('html')[0].classList.add('overflow-hidden');
    } else {
      document.getElementsByTagName('html')[0].classList.remove('overflow-hidden');
      setActiveMenuItem(0);
    }
  }, [isOpen, props?.fields?.items]);

  const toggleDropdown = () => {
    isOpen
      ? window.scroll({
          top: window.scrollY - HAMBURGER_SCROLL_GAP,
        })
      : window.scroll({
          top: window.scrollY + HAMBURGER_SCROLL_GAP,
        });
    setIsOpen(!isOpen);
    setSubmenuIsOpen(false);
  };

  const activateMenuItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setSubmenuIsOpen(true);
    setActiveMenuItem(button.value as unknown as number);
  };

  const closeSubmenu = () => {
    setSubmenuIsOpen(false);
  };

  return (
    <div
      className={`hamburger ${
        isHamburgerMenuVisible ? '' : 'md:hidden block md:p-0 pl-[1.313rem] pt-[0.125rem]'
      } flex flex-col h-full cursor-pointer items-end`}
    >
      <button
        aria-label="Menu"
        className="h-[28px] w-[28px] md:h-[48px] md:w-[30px] pt-[0.188rem] md:pt-[0.781rem] flex relative"
        onClick={toggleDropdown}
      >
        {isOpen ? (
          <CloseIcon fill={`${isNeedScrolling ? `${scrolling ? 'black' : 'white'}` : 'black'}`} />
        ) : (
          <HamburgerIcon
            fill={`${isNeedScrolling ? `${scrolling ? 'black' : 'white'}` : 'black'}`}
          />
        )}
      </button>
      <div
        className={`transition-all hamburger flex flex-col h-full cursor-pointer items-end opacity-0  ${
          isOpen ? `opacity-100` : `hidden`
        }`}
      >
        <div className="absolute h-[calc(100vh-100px)] w-full left-0 mt-[-50px] md:mt-[20px] z-10">
          <div className="relative h-full overflow-auto">
            <div className="bg-mainPurple md:hidden flex content-center p-[16px]">
              <div className="grow">
                <Logo />
              </div>
              <button onClick={toggleDropdown}>
                <CloseIcon fill="white" />
              </button>
            </div>
            <div className={`flex mb-[1px] bg-white overflow-x-croll`} ref={dropdownRef}>
              <div
                className={`bg-mainPurple md:bg-mainPurple ${
                  SubmenuIsOpen ? 'w-0 md:w-1/3' : 'w-[100vw] md:w-1/3'
                }`}
              >
                <nav className="w-full items-end flex flex-col md:py-[50px]">
                  {props?.fields?.items?.map((item, index) => {
                    if (!item?.fields?.NavigationTitle?.value) {
                      return null;
                    }
                    return (
                      <button
                        onClick={activateMenuItem}
                        key={`${index}-hamburger`}
                        value={index + 1}
                        className={`flex items-center w-full md:max-w-[240px] px-[16px] py-[9px] font-arial text-[1rem] md:text-[1.5rem] text-left md:leading-normal leading-[156%] text-white ${
                          activeMenuItem == index + 1
                            ? 'bg-mainPurple md:bg-white md:text-aubergine md:font-semibold'
                            : 'hover:text-shadow-white'
                        }`}
                      >
                        {item?.fields?.NavigationTitle?.value}
                        <span className="inline md:hidden ml-[10px]">
                          <RightArrowIcon height={9} />
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              <div
                className={`bg-mainPurple md:bg-white md:w-2/3 max-w-[980px] ${
                  SubmenuIsOpen ? 'w-[100vw] px-[0] md:px-[46px] py-[22px] md:py-[34px]' : 'w-0'
                }`}
              >
                {SubmenuIsOpen && (
                  <button
                    onClick={closeSubmenu}
                    className="md:hidden flex items-center mr-[0.5rem] text-white leading-normal float-right font-bold absolute top-[5.625rem] right-[1.375rem]"
                  >
                    <BackArrow />
                    Back
                  </button>
                )}

                {Object.keys(props?.rendering?.placeholders ?? {}).map((phKey, index) => {
                  return (
                    <div
                      key={`hamburger-row-${index * 1}`}
                      className={activeMenuItem == index ? 'block' : 'hidden'}
                    >
                      <Placeholder name={phKey} rendering={props.rendering} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
