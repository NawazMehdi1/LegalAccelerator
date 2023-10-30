import {
  Text,
  RichText as JssRichText,
  Image as JssImage,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import MapIcon from 'core/atoms/Icons/MapIcon';
import { AddressAndMapProps } from './addressAndMap.types';

const AddressAndMap = (props: AddressAndMapProps): JSX.Element => {
  const { t } = useI18n();
  const mapItem = props?.fields?.data?.dataSource?.MapURL?.jsonValue?.value?.text;
  const hasValues =
    props?.fields?.data?.dataSource?.Title?.jsonValue ||
    props?.fields?.data?.dataSource?.BuildingName?.jsonValue ||
    props.fields.data.dataSource.OfficeAddress1?.jsonValue.value ||
    props.fields.data.dataSource.OfficeAddress2?.jsonValue.value ||
    props.fields.data.dataSource.OfficeAddress3?.jsonValue.value ||
    props.fields.data.dataSource.City?.jsonValue.value ||
    props.fields.data?.dataSource?.State?.jsonValue?.value ||
    props.fields.data?.dataSource?.PostalCode?.jsonValue?.value ||
    props?.fields?.data?.dataSource?.Country?.jsonValue?.value ||
    props?.fields?.data?.dataSource?.PhoneNumber?.jsonValue?.value ||
    props?.fields?.data?.dataSource?.FaxNumber?.jsonValue ||
    props?.fields?.data?.dataSource?.Image?.jsonValue ||
    mapItem;
  if (!hasValues) {
    return <></>;
  }
  const phoneNumber = props?.fields?.data?.dataSource?.PhoneNumber?.jsonValue?.value;
  const concatenatedAddresses = [
    props?.fields?.data?.dataSource?.BuildingName?.jsonValue?.value,
    props.fields.data.dataSource.OfficeAddress1?.jsonValue.value,
    props.fields.data.dataSource.OfficeAddress2?.jsonValue.value,
    props.fields.data.dataSource.OfficeAddress3?.jsonValue.value,
    props.fields.data.dataSource.City?.jsonValue.value,
    props.fields.data?.dataSource?.State?.jsonValue?.value,
    props.fields.data?.dataSource?.PostalCode?.jsonValue?.value,
    props?.fields?.data?.dataSource?.Country?.jsonValue?.value,
  ]
    .filter(Boolean)
    .join(', ');
  return (
    <div className="bg-aubergine">
      <div className="max-w-[1200px] 2xl:max-w-[1440px] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto grid grid-cols-12">
        <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4  my-[50px] text-white">
          {t('AddressTitle') && (
            <p className="text-[1.5rem] font-bold leading-normal mb-[1.875rem]">
              {t('AddressTitle')}
            </p>
          )}

          <JssRichText
            field={{ value: concatenatedAddresses }}
            className="md:text-[24px] md:leading-normal leading-[156%] md:mb-[28px] mb-[30px]"
          />
          {props?.fields?.data?.dataSource?.PhoneNumber?.jsonValue?.value && (
            <div className="md:text-[24px] font-bold md:leading-normal leading-[156%]">
              <span>{t('PhoneNumber')}: </span>
              <JssLink field={{ href: `tel:${phoneNumber}` }} className="hover:underline">
                {props?.fields?.data?.dataSource?.PhoneNumber?.jsonValue?.value}
              </JssLink>
            </div>
          )}
          {props?.fields?.data?.dataSource?.FaxNumber?.jsonValue?.value && (
            <div className="md:text-[24px] font-bold md:leading-normal leading-[156%]">
              <span>{t('FaxNumber')}: </span>
              <Text field={props?.fields?.data?.dataSource?.FaxNumber?.jsonValue} />
            </div>
          )}
          {mapItem && (
            <div className="flex mt-[30px]">
              <a
                href={props?.fields?.data?.dataSource?.MapURL?.jsonValue?.value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex"
              >
                <span className="flex addressMapIcon">
                  <span>
                    <MapIcon fill="#fff" />
                  </span>
                  <span className="ml-[10px] font-bold leading-normal">{mapItem}</span>
                </span>
              </a>
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-8">
          <JssImage
            field={props?.fields?.data?.dataSource?.Image?.jsonValue}
            className="md:h-[578px] h-[522px] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressAndMap;
