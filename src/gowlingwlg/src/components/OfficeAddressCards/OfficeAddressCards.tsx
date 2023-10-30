import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  OfficeAddressCardsProps,
  OfficeCardItems,
} from '../../core/atoms/OfficeCards/OfficeCards.type';
import OfficeCards from '../../core/atoms/OfficeCards/OfficeCards';

const OfficeAddressCards = (props: OfficeAddressCardsProps): JSX.Element => {
  const contentCards = props?.fields?.data?.dataSource?.offices?.targetItems;
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';

  if (!Array.isArray(contentCards) || contentCards.length === 0) {
    return <></>;
  }

  const hasOfficeCardWithValues = contentCards.some((officeCard) => {
    return (
      officeCard?.CityTitle?.jsonValue?.value ||
      officeCard?.OfficeAddress1?.jsonValue?.value ||
      officeCard?.OfficeAddress2?.jsonValue?.value ||
      officeCard?.OfficeAddress3?.jsonValue?.value ||
      officeCard?.PhoneNumber?.jsonValue?.value ||
      officeCard?.FaxNumber?.jsonValue?.value ||
      officeCard?.MapURL?.jsonValue?.value?.text
    );
  });

  if (!hasOfficeCardWithValues && !isEditing) {
    return <></>;
  }

  return (
    <>
      <div className="grid max-w-[1200px] 2xl:max-w-[1440px] xl:m-auto px-[15px] xl:px-0 pt-[40px] pb-[80px]">
        <div className={`flex flex-wrap -mx-[10px]`}>
          {props?.fields?.data?.dataSource?.offices?.targetItems.map(
            (officeCard: OfficeCardItems, index: number) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/4  px-[10px] mb-[30px] min-h-[300px]"
              >
                <OfficeCards {...officeCard} />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default OfficeAddressCards;
