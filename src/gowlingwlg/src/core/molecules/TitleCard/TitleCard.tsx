import {
  Text,
  Image,
  useSitecoreContext,
  RichText,
  DateField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { TitleCardProps, bgType, styleType, BreadcrumbItem } from './types';
import dynamic from 'next/dynamic';
import { newFormatDate } from 'core/utils/formatDate';
import IconActions from 'core/molecules/ActionIcons/ActionIcons';
import { useI18n } from 'next-localization';
import Breadcrumb from 'components/BreadCrumb';

const DynamicDownloadPageAsPdf = dynamic(() => import('core/atoms/DownloadPageAsPdf'), {
  ssr: false,
});
const TitleCard = ({ fields, params }: TitleCardProps): JSX.Element => {
  const icons = fields?.data?.icons?.children?.results || [];
  const otherIcons = icons.filter((icon) => icon.name.toLowerCase() !== 'download');
  const downloadIcon = icons.find((icon) => icon.name.toLowerCase() === 'download');
  const { t } = useI18n();
  const param = (params?.Styles as bgType) || 'bg-mainPurple';
  const style = {
    testColor: 'text-white',
    fill: 'white',
  } as styleType;
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const breadcrumbData = (sitecoreContext?.Breadcrumb || []) as BreadcrumbItem[];
  const publishedDate = fields?.data?.item?.publishedDate?.jsonValue?.value;
  const formatedDate = newFormatDate(publishedDate, sitecoreContext.language as unknown as string);
  const bgColor = bgType.white || bgType.extraLightGrey || bgType.lightPurple;
  if (param === bgColor) {
    style.testColor = 'text-black';
    style.fill = 'white';
  }

  const hasContent =
    isEditing ||
    fields?.data?.item?.title?.jsonValue?.value ||
    fields?.data?.item?.subTitle?.jsonValue?.value ||
    fields?.data?.item?.pageType?.targetItem?.icon?.jsonValue?.value ||
    fields?.data?.item?.pageType?.targetItem?.pageType?.value ||
    fields?.data?.item?.publishedDateOverrideText?.jsonValue?.value ||
    fields?.data?.item?.publishedDate?.jsonValue?.value ||
    fields?.data?.item?.readTime?.jsonValue?.value ||
    fields?.data?.icons?.children?.results?.length > 0;

  if (!hasContent) {
    return <></>;
  }

  return (
    <div className={`${param} ${style.testColor} w-full title-cards`} data-testid="title-card">
      <div className="max-w-[1200px] 2xl:max-w-[1440px] mx-[22px] md:mx-[34px] xl:m-auto py-[50px] md:bg-stylized-logo bg-no-repeat bg-right bg-cover">
        <div className="print:hidden breadcrumb">
          <Breadcrumb fields={breadcrumbData} />
        </div>
        <div className="flex flex-row gap-[10px] items-center">
          <Image
            field={fields?.data?.item?.pageType?.targetItem?.icon?.jsonValue}
            className={`brightness-0 h-[25px] ${param === bgColor ? '' : 'invert'}`}
          />
          <Text
            tag="p"
            className="font-bold"
            field={fields?.data?.item?.pageType?.targetItem?.pageType}
          />
          {formatedDate === '' || null ? (
            ''
          ) : (
            <span className="flex leading-normal items-center mr-[-5px] small-text">
              {t('Published')}
            </span>
          )}
          <DateField
            tag="span"
            editable={true}
            className="flex text-[10px] items-center"
            field={{ value: formatedDate }}
          />
        </div>
        <Text
          tag="h1"
          field={fields?.data?.item?.title?.jsonValue}
          className="font-arial py-[17px] md:py-[15px] text-[32px] leading-[132.5%] max-w-[820px]"
        />
        <RichText
          field={fields?.data?.item?.subTitle?.jsonValue}
          className="pb-[19px] md:pb-[8px] max-w-[820px] article_desc"
        />
        <div className="flex reading_time ">
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
          <div className="gap-[25px] flex flex-row  lg:gap-[15px] title_icons items-center">
            {downloadIcon && (
              <DynamicDownloadPageAsPdf key="download-icon">
                <Image
                  field={downloadIcon?.image?.jsonValue}
                  className={`brightness-0 h-[25px] ${param === bgType.white ? '' : 'invert'}`}
                />
              </DynamicDownloadPageAsPdf>
            )}
            {otherIcons.map((icon) => (
              <IconActions
                key={icon?.name}
                icons={[icon]}
                iconClassName={`h-[25px] brightness-0  print:hidden ${
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
