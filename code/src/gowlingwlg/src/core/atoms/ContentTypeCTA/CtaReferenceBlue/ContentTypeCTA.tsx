import {
  Image,
  Text,
  withDatasourceCheck,
  Link as JssLink,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ContentTypeCTAProps, handleCtaClick } from '../contentTypeCta.types';
import { newFormatDate } from 'core/utils/formatDate';
import CTALeftIcon from 'core/atoms/Icons/CTALeftIcon';

const ContentTypeCTA = (props: ContentTypeCTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const fieldsItem = props?.fields?.data?.item?.referenceItem?.targetItem;
  const ctaValue = props?.fields?.data?.item?.CallToAction?.jsonValue?.value;
  if (!fieldsItem || !ctaValue) {
    return <></>;
  }
  return (
    <div className="bg-darkBlue relative md:flex items-center justify-between md:pr-[100px]  md:px-[0] px-[20px]">
      <CTALeftIcon />
      <div className="md:w-[800px] md:absolute md:pb-[55px] pb-[40px] left-[100px]">
        <div className="flex gap-[10px] items-center">
          <Image
            className="w-[28px] brightness-0 invert"
            field={fieldsItem?.pageType?.targetItem?.icon?.jsonValue}
          />
          <Text
            className="text-white leading-normal font-bold"
            tag="p"
            field={fieldsItem?.pageType?.targetItem?.pageType?.jsonValue}
          />
          <span className="text-white text-[10px] leading-[140%]">
            {newFormatDate(
              fieldsItem?.publishedDate?.jsonValue?.value,
              sitecoreContext.language as unknown as string
            )}
          </span>
        </div>
        <JssRichText
          className="md:mt-[12px] mt-[20px] text-white leading-normal"
          tag="h4"
          field={fieldsItem?.title?.jsonValue}
        />
      </div>
      {ctaValue && (
        <div className="pb-[59px] md:pb-0">
          <JssLink
            field={{
              href: ctaValue?.href || '#',
            }}
            onClick={() => handleCtaClick(fieldsItem?.title?.jsonValue?.value)}
            className="bg-white text-[14px] font-bold leading-normal tracking-[0.56px] flex items-center justify-center text-black  hover:bg-extraLightGrey rounded-[100px] md:w-[208px] h-[64px]"
          >
            {ctaValue?.text || ''}
          </JssLink>
        </div>
      )}
    </div>
  );
};

export default withDatasourceCheck()<ContentTypeCTAProps>(ContentTypeCTA);
