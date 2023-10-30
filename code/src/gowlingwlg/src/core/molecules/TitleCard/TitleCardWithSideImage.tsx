import React from 'react';
import { Text, RichText, useSitecoreContext, DateField } from '@sitecore-jss/sitecore-jss-nextjs';
import { TitleCardProps, bgType, styleType, BreadcrumbItem } from './types';
import Image from '../../atoms/Image';
import { newFormatDate } from 'core/utils/formatDate';
import IconActions from '../ActionIcons/ActionIcons';
import dynamic from 'next/dynamic';
import { useI18n } from 'next-localization';
const DynamicDownloadPageAsPdf = dynamic(() => import('core/atoms/DownloadPageAsPdf'), {
  ssr: false,
});
import Breadcrumb from '../../../components/BreadCrumb';

const TitleCard = ({ fields, params }: TitleCardProps): JSX.Element => {
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const param = (params?.Styles as bgType) || 'bg-mainPurple';
  const publishedDate = fields?.data?.item?.publishedDate?.jsonValue?.value;
  const formatedDate = newFormatDate(publishedDate, sitecoreContext.language as unknown as string);
  const breadcrumbData = (sitecoreContext?.Breadcrumb || []) as BreadcrumbItem[];
  const icons = fields?.data?.icons?.children?.results || [];
  const downloadIcon = icons.find((icon) => icon.name.toLowerCase() === 'download');
  const otherIcons = icons.filter((icon) => icon.name.toLowerCase() !== 'download');
  const style = {
    testColor: 'text-white',
    fill: 'white',
  } as styleType;

  const bgColor = bgType.white || bgType.extraLightGrey || bgType.lightPurple;
  if (param === bgColor) {
    style.testColor = 'text-black';
    style.fill = 'white';
  }

  return (
    <div
      className={`${param} ${style.testColor} title-cards`}
      data-testid="title-card-with-side-image"
    >
      <div className="2xl:mx-auto 2xl:max-w-[1440px]">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full px-[22px] ml-0 mr-0 lg:px-[0] lg:w-[51%] flex">
            <div className="py-[50px] lg:pr-[88px] lg:ml-[111px] 2xl:ml-0 lg:h-max lg:min-h-[373px]">
              <div className="print:hidden">
                <Breadcrumb fields={breadcrumbData} />
              </div>
              <div className="flex flex-row gap-[10px] items-center">
                <Image
                  field={fields?.data?.item?.pageType?.targetItem?.icon?.jsonValue}
                  className={`brightness-0 ${param === bgColor ? '' : 'invert'} h-[25px]`}
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
                tag="h3"
                field={fields?.data?.item?.title?.jsonValue}
                className="py-0 mt-[18px] font-arial text-[32px] leading-[132.5%] tracking-[-0.32px] lg:tracking-[-0.96px] lg:leading-normal lg:text-[48px] lg:font-gowlingBliss lg:mt-0"
              />
              <RichText className="mt-[18px]" field={fields?.data?.item?.subTitle?.jsonValue} />
              <div className="flex reading_time">
                {fields?.data?.item?.ShowReadTime?.jsonValue?.value === true &&
                fields?.data?.item?.ShowReadTime?.jsonValue?.value ? (
                  <div className="flex mt-[0.938rem]">
                    <Text
                      tag="p"
                      className="text-small"
                      field={fields?.data?.item?.readTime?.jsonValue}
                    />
                    &nbsp;
                    <div className="mr-[1.313rem]">{t('minuteRead')}</div>
                  </div>
                ) : null}
                <div className="flex mt-[15px] flex-row gap-[25px] lg:gap-[15px] title_icons items-center">
                  {downloadIcon && (
                    <DynamicDownloadPageAsPdf key="download-icon">
                      <Image
                        field={downloadIcon?.image?.jsonValue}
                        className={`brightness-0 h-[25px] ${
                          param === bgType.white ? '' : 'invert'
                        }`}
                      />
                    </DynamicDownloadPageAsPdf>
                  )}
                  {otherIcons.map((icon) => (
                    <IconActions
                      key={icon?.name}
                      icons={[icon]}
                      iconClassName={`brightness-0 h-[25px] print:hidden ${
                        param === bgType.white ? '' : 'invert'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[49%] lg:relative lg:right-0">
            <Image
              field={fields?.data?.item?.image?.jsonValue}
              className="w-full h-full lg:min-h-[373px] lg:absolute flex object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
