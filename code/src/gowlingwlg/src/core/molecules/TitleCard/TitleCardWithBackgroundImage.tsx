/* eslint-disable react-hooks/exhaustive-deps */
import { DateField, Text, RichText, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
const DynamicDownloadPageAsPdf = dynamic(() => import('core/atoms/DownloadPageAsPdf'), {
  ssr: false,
});

import Image from 'core/atoms/Image';
import { TitleCardProps, DataLayerEvent, bgType, styleType, BreadcrumbItem } from './types';
import { newFormatDate } from 'core/utils/formatDate';
import IconActions from '../ActionIcons/ActionIcons';
import { useEffect } from 'react';
import { useI18n } from 'next-localization';
import dynamic from 'next/dynamic';
import Breadcrumb from '../../../components/BreadCrumb';

const handlePageOnload = (
  type: string | number | undefined,
  title: string | number | undefined,
  author: string
) => {
  const authorString = author;
  const eventTitleCardData: DataLayerEvent = {
    event: 'insight_detail_view',
    insight_type: type,
    insight_title: title,
    insight_authors: authorString,
  };
  window.dataLayer.push(eventTitleCardData);
};

const TitleCard = ({ fields, params }: TitleCardProps): JSX.Element => {
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const param = (params?.Styles as bgType) || 'bg-mainPurple';
  const breadcrumbData = (sitecoreContext?.Breadcrumb || []) as BreadcrumbItem[];
  const icons = fields?.data?.icons?.children?.results || [];
  const otherTitleIcons = icons.filter((icon) => icon.name.toLowerCase() !== 'download');
  const downloadTitleIcon = icons.find((icon) => icon.name.toLowerCase() === 'download');
  const keyContactsField = sitecoreContext?.route?.fields?.['Key Contacts'];
  const displayNames: string[] = [];

  if (Array.isArray(keyContactsField)) {
    keyContactsField.forEach((contact) => {
      if (contact && contact.displayName) {
        displayNames.push(contact.displayName);
      }
    });
  }
  useEffect(() => {
    const authorString = displayNames.join('|');

    handlePageOnload(
      fields?.data?.item?.pageType?.targetItem?.pageType?.value,
      fields?.data?.item?.title?.jsonValue?.value,
      authorString
    );
  }, []);

  const style = {
    testColor: 'text-white',
    fill: 'white',
  } as styleType;

  const bgColor = bgType.white || bgType.extraLightGrey || bgType.lightPurple;
  if (param === bgColor) {
    style.testColor = 'text-black';
    style.fill = 'white';
  }
  const publishedDate = fields?.data?.item?.publishedDate?.jsonValue?.value;
  const formatedDate = newFormatDate(publishedDate, sitecoreContext.language as unknown as string);
  return (
    <div
      className={`${param} ${style.testColor} title-cards`}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('${fields?.data?.item?.backgroundImage?.jsonValue?.value?.src}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      data-testid="title-card-with-background-image"
    >
      <div className="max-w-[1200px] 2xl:max-w-[1440px] py-[50px] mx-[22px] md:mx-[34px] xl:m-auto  text-white">
        <div className="breadcrumb print:hidden">
          <Breadcrumb fields={breadcrumbData} />
        </div>
        <div className="flex flex-row gap-[10px]">
          <Image
            field={fields?.data?.item?.pageType?.targetItem?.icon?.jsonValue}
            className="brightness-0 invert h-[25px]"
          />
          <Text
            tag="p"
            className="font-bold"
            field={fields?.data?.item?.pageType?.targetItem?.pageType}
          />
          {formatedDate === '' || null ? (
            ''
          ) : (
            <span className="leading-normal items-center flex mr-[-5px] small-text">
              {t('Published')}
            </span>
          )}
          <DateField
            tag="span"
            editable={true}
            className="text-[10px] items-center flex"
            field={{ value: formatedDate }}
          />
        </div>
        <Text
          tag="h1"
          field={fields?.data?.item?.title?.jsonValue}
          className="py-[17px] md:py-[15px] font-arial text-[32px] leading-[132.5%] max-w-[820px]"
        />
        <RichText
          field={fields?.data?.item?.subTitle?.jsonValue}
          className="pb-[19px] md:pb-[8px] max-w-[820px] article_desc"
        />
        <div className="flex reading_time">
          {fields?.data?.item?.ShowReadTime?.jsonValue?.value === true &&
          fields?.data?.item?.ShowReadTime?.jsonValue?.value ? (
            <div className="flex">
              <Text
                tag="p"
                className="text-small"
                field={fields?.data?.item?.readTime?.jsonValue}
              />
              &nbsp;
              <div className="mr-[1.313rem]">{t('minuteRead')}</div>
            </div>
          ) : null}
          <div className="gap-[25px] lg:gap-[15px] title_icons flex flex-row  items-center">
            {downloadTitleIcon && (
              <DynamicDownloadPageAsPdf key="download-icon">
                <Image
                  field={downloadTitleIcon?.image?.jsonValue}
                  className={`brightness-0 h-[25px] ${param === bgType.white ? '' : 'invert'}`}
                />
              </DynamicDownloadPageAsPdf>
            )}
            {otherTitleIcons.map((icon) => (
              <IconActions
                key={icon?.name}
                icons={[icon]}
                iconClassName={` print:hidden brightness-0 h-[25px]  ${
                  param === bgType.white ? '' : 'invert'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
