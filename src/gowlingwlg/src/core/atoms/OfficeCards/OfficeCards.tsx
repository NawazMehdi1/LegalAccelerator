import { useSitecoreContext, Text, Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { OfficeCardItems } from '../OfficeCards/OfficeCards.type';

import MapIcon from '../Icons/MapIcon';

const OfficeCards = (props: OfficeCardItems): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const { t } = useI18n();
  const PhoneNumber = props?.PhoneNumber?.jsonValue?.value;
  const FaxNumber = props?.FaxNumber?.jsonValue?.value;
  const MapItem = props?.MapURL?.jsonValue?.value?.text;

  const URL = sitecoreContext.itemPath + '/' + props?.CityTitle?.jsonValue?.value;

  const hasValues =
    props?.CityTitle?.jsonValue?.value ||
    props?.OfficeAddress1?.jsonValue?.value ||
    props?.OfficeAddress2?.jsonValue?.value ||
    props?.OfficeAddress3?.jsonValue?.value ||
    PhoneNumber ||
    FaxNumber ||
    MapItem;

  if (!hasValues) {
    return <></>;
  }

  return (
    <div className="w-full bg-extraLightGrey h-full pt-[2.5rem] pb-[1.875rem] pl-[1.875rem] pr-[1.688rem] relative">
      <a href={URL} className="inline-block mb-[30px] hover:text-purple cursor-pointer">
        <Text
          className="w-full subtitle-bold text-black leading-normal"
          field={props?.CityTitle?.jsonValue}
          tag="h4"
        />
      </a>
      <div className="w-full mb-[20px]">
        <Text
          className="w-full body-text text-black"
          field={props?.OfficeAddress1?.jsonValue}
          tag="p"
        />
        <Text
          className="w-full body-text text-black"
          field={props?.OfficeAddress2?.jsonValue}
          tag="p"
        />
        <Text
          className="w-full body-text text-black"
          field={props?.OfficeAddress3?.jsonValue}
          tag="p"
        />
      </div>
      <div className="w-full mb-[30px]">
        {PhoneNumber && (
          <div className="flex font-bold">
            <span className="mr-[5px] text-black"> {t('PhoneNumber')}: </span>
            <JssLink className="text-black" field={{ href: `tel:${PhoneNumber}` }}>
              {PhoneNumber}
            </JssLink>
          </div>
        )}
        {FaxNumber && (
          <div className="flex font-bold text-black">
            <span className="mr-[5px]"> {t('FaxNumber')}:</span>
            <div className="text-black"> {FaxNumber} </div>
          </div>
        )}
      </div>
      {MapItem && (
        <div>
          <a
            className="inline-block"
            target={props?.MapURL?.jsonValue?.value?.target}
            href={props?.MapURL?.jsonValue?.value?.href}
            title={props?.MapURL?.jsonValue?.value?.title}
          >
            <span className="flex mapIcon">
              <span>
                <MapIcon />
              </span>
              <span className="ml-[10px] font-bold leading-normal"> {MapItem}</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

export default OfficeCards;
