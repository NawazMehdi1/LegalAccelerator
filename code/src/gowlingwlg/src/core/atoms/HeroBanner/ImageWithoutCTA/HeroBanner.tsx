import { Field, withDatasourceCheck, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  RichText as JssRichText,
  Image as JssImage,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Breadcrumb from '../../../../components/BreadCrumb';

type HeroBannerProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    ForegroundImage: ImageField;
    BackgroundImage: ImageField;
  };
};

interface BreadcrumbItem {
  Title: string;
  Url: string;
}

const getTextColorClass = (backgroundColorClass: string): string[] => {
  const whiteTextClasses = ['bg-lightPurple'];
  const blackTextClasses = ['bg-extraLightGrey', 'bg-extralightPurple', 'bg-white', 'bg-darkBlue'];
  if (whiteTextClasses.includes(backgroundColorClass)) {
    return ['text-white'];
  } else if (blackTextClasses.includes(backgroundColorClass)) {
    return ['text-black'];
  } else {
    return ['text-mainPurple'];
  }
};

const HeroBanner = (props: HeroBannerProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const hasData =
    props?.fields?.Title?.value !== '' ||
    props?.fields?.Description?.value !== '' ||
    (props?.fields?.BackgroundImage?.value?.src !== undefined &&
      props?.fields?.BackgroundImage?.value?.src !== '') ||
    (props?.fields?.ForegroundImage?.value?.src !== undefined &&
      props?.fields?.ForegroundImage?.value?.src !== '');

  if (!hasData) {
    return <></>;
  }
  const defaultBackgroundColorClass = 'bg-white';
  const backgroundColorClass = props?.params?.Styles || defaultBackgroundColorClass;
  const textColorClass = getTextColorClass(backgroundColorClass);
  const breadcrumbData = (sitecoreContext?.Breadcrumb || []) as BreadcrumbItem[];

  return (
    <>
      <div className={`${backgroundColorClass} hero-banner-mobile h-auto md:h-[542px] relative`}>
        {props?.fields?.BackgroundImage && (
          <JssImage
            field={props?.fields?.BackgroundImage}
            className="bg-cover h-full w-full bg-no-repeat bg-center lg:block md:block hidden"
          />
        )}
        <div className="lg:absolute w-full lg:top-0">
          <div
            className={`${textColorClass} max-w-[1200px] 2xl:max-w-[1440px] md:h-[542px]  w-full grid lg:flex 2xl:m-auto lg:mx-[100px] py-[40px] md:py-0  mx-[20px] overflow-hidden line-clamp-3 `}
          >
            <div className="md:my-auto">
              <Breadcrumb fields={breadcrumbData} />
              {props?.fields?.Title && (
                <JssRichText
                  tag="h1"
                  field={{
                    ...props?.fields?.Title,
                    value: props?.fields?.Title?.value,
                  }}
                  className={`w-[325px] lg:w-[606px] font-gowlingBliss font-bold lg:tracking-[-1.56px] tracking-[-0.96px] ${textColorClass} md:text-[78px] text-[48px] leading-normal mb-5 `}
                />
              )}
              {props?.fields?.Description && (
                <JssRichText
                  field={{
                    ...props?.fields?.Description,
                    value: props?.fields?.Description?.value,
                  }}
                  className={`w-[348px] lg:w-[606px] ${textColorClass} md:text-[24px] text-[16px] font-arial font-normal lg:leading-normal leading-[156%] overflow-hidden line-clamp-6`}
                />
              )}
            </div>
            {props?.fields?.ForegroundImage && (
              <JssImage
                field={props?.fields?.ForegroundImage}
                className="h-[470px] lg:h-[470px] lg:block hidden m-auto relative mb-0"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withDatasourceCheck()<HeroBannerProps>(HeroBanner);
