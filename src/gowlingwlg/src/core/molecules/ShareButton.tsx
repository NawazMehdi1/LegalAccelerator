import Share from 'core/atoms/Icons/Share';
import { useI18n } from 'next-localization';
import ChainLink from 'core/atoms/Icons/ChainLink';
import Envelope from 'core/atoms/Icons/Envelope';
import Twitter from 'core/atoms/Icons/Twitter';
import Facebook from 'core/atoms/Icons/Facebook';
import Linkedin from 'core/atoms/Icons/Linkedin';
import { useState } from 'react';
import Polygon from 'core/atoms/Icons/Polygon';

const ShareButton = () => {
  const { t } = useI18n();
  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <>
      <button
        className="bg-mainPurple text-white py-[0.5rem] px-[0.75rem] small-text rounded-full flex gap-x-[0.375rem] relative"
        aria-label="Customise options"
        onClick={toggleDropDown}
      >
        <Share />
        {t('share')}
        <div
          className={`bg-white top-10 text-black -left-[3.313rem] absolute z-10 shadow-tooltip w-[11.25rem] pb-[0.938rem] ${
            dropDown ? 'block' : 'hidden'
          }`}
        >
          <div className="p-[0.938rem] relative">
            <div
              className="st-custom-button w-full items-center justify-start grid grid-cols-iconText gap-x-[0.625rem] small-text"
              data-network="copy"
            >
              <ChainLink />
              {t('CopyLink')}
            </div>
          </div>
          <hr className="py-[0.313]" />
          <div className="px-[0.938rem] py-[0.625rem]">
            <div
              className="st-custom-button w-full items-center justify-start grid grid-cols-iconText gap-x-[0.625rem] small-text"
              data-network="email"
              data-email-subject="I'd like to share a link with you"
            >
              <Envelope fill="#000" />
              {t('email')}
            </div>
          </div>
          <div className="px-[0.938rem] py-[0.625rem]">
            <div
              className="st-custom-button w-full justify-start grid grid-cols-iconText items-center gap-x-[0.625rem] small-text"
              data-network="twitter"
            >
              <Twitter />
              {t('ShareOnTwitter')}
            </div>
          </div>
          <div className="px-[0.938rem] py-[0.625rem]">
            <div
              className="st-custom-button w-full justify-start grid grid-cols-iconText items-center gap-x-[0.625rem] small-text"
              data-network="facebook"
            >
              <Facebook />
              {t('ShareOnFacebook')}
            </div>
          </div>
          <div className="px-[0.938rem] py-[0.625rem]">
            <div
              className="st-custom-button w-full justify-start grid grid-cols-iconText items-center gap-x-[0.625rem] small-text"
              data-network="linkedin"
            >
              <Linkedin />
              {t('ShareOnLinkedIn')}
            </div>
          </div>
          <span className="absolute -top-1 origin-center rotate-180 left-[5.313rem]">
            <Polygon />
          </span>
        </div>
      </button>
    </>
  );
};

export default ShareButton;
