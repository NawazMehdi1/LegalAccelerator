import {
  Text,
  Field,
  withDatasourceCheck,
  Placeholder,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ImageField, Link as JssLink, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from '../../Image';
import { useState, useEffect } from 'react';

type HeroBannerProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    ForegroundImage: ImageField;
    BackgroundImage: ImageField;
    CTA1: LinkField;
    CTA2: LinkField;
  };
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};
const getTextColorClass = (backgroundColorClass: string): string[] => {
  const whiteTextClasses = ['bg-lightPurple', 'bg-maroon', 'text-white'];
  const blackTextClasses = [
    'bg-extraLightGrey',
    'bg-extralightPurple',
    'bg-white',
    'bg-darkBlue',
    'text-black',
  ];

  if (whiteTextClasses.includes(backgroundColorClass)) {
    return ['text-white'];
  } else if (blackTextClasses.includes(backgroundColorClass)) {
    return ['text-black'];
  } else {
    return [''];
  }
};

const HeroBanner = (props: HeroBannerProps): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);
  const defaultBackgroundColorClass = 'bg-lightPurple';
  const backgroundColorClass = props?.params?.Styles || defaultBackgroundColorClass;
  const textColorClass = getTextColorClass(backgroundColorClass);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const backgroundPosition = isMobile ? '70% center' : '50% 50%';

  const backgroundStyle = {
    backgroundImage: `url('${props?.fields?.BackgroundImage?.value?.src}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: backgroundPosition,
  };
  const getTextCTAColorClass = (backgroundCTAColorClass: string): string => {
    const blackCTATextClasses = ['bg-lightBlue'];
    return blackCTATextClasses.includes(backgroundCTAColorClass) ? 'text-black' : 'text-white';
  };

  const defaultCTABackgroundColorClass = 'bg-lightBlue';
  const backgroundCTAColorClass =
    props?.params?.CTABackgroundColor || defaultCTABackgroundColorClass;
  const textCTAColorClass = getTextCTAColorClass(backgroundCTAColorClass);
  const textWhite = () => {
    if (textColorClass[0] == 'text-white') {
      return ['text-white border-white'];
    } else {
      return ['text-black border-black hover:border-white'];
    }
  };

  const hasData =
    props?.fields?.Title?.value !== '' ||
    props?.fields?.Description?.value !== '' ||
    (props?.fields?.CTA1?.value?.href !== undefined && props?.fields?.CTA1?.value?.href !== '') ||
    (props?.fields?.CTA2?.value?.href !== undefined && props?.fields?.CTA2?.value?.href !== '') ||
    (props?.fields?.BackgroundImage?.value?.src !== undefined &&
      props?.fields?.BackgroundImage?.value?.src !== '') ||
    (props?.fields?.ForegroundImage?.value?.src !== undefined &&
      props?.fields?.ForegroundImage?.value?.src !== '');

  return (
    <div
      className={`${backgroundColorClass} mt-[-6.25rem]  ${
        !hasData ? 'md:pt-[4.625rem] pt-[6.25rem]' : 'pt-[9.25rem]'
      }`}
    >
      {hasData && (
        <div className={`${backgroundColorClass} hero-banner-mobile`} style={backgroundStyle}>
          <div className="max-w-[1200px] 2xl:max-w-[1440px] mx-[22px] grid lg:flex lg:m-auto">
            <div className="text-section mt-25px md:mt-[20px]">
              <Text
                tag="h1"
                className={`w-[325px] lg:w-[606px] font-gowlingBliss lg:tracking-[-1.56px] tracking-[-0.96px] ${textColorClass}  md:text-[3.75rem] text-[2rem] font-bold leading-normal mb-5 overflow-hidden`}
                field={{
                  ...props?.fields?.Title,
                  value: props?.fields?.Title?.value,
                }}
              />
              <Text
                tag="h2"
                field={props?.fields?.Description}
                className={`w-[348px] lg:w-[463px] ${textColorClass} md:text-[24px] text-[16px] font-arial font-normal md:leading-normal leading-[156%] lg:mb-[40px] mb-[27px] lg:tracking-[-0.24px] tracking-[-0.16px] overflow-hidden line-clamp-6`}
              />
              <div className="inline-grid lg:flex">
                {props?.fields?.CTA1 && (
                  <JssLink
                    field={props.fields.CTA1}
                    className={
                      props?.fields?.CTA1?.value?.href
                        ? `transition-all font-arial hover:bg-extradarkBlue hover:text-white ${backgroundCTAColorClass} ${textCTAColorClass} flex items-center h-[49px] rounded-[100px] leading-normal text-[14px] font-bold tracking-[0.56px] px-[33px] lg:mr-[19px] mb-[27px] lg:mb-0 `
                        : ''
                    }
                  />
                )}
                {props?.fields?.CTA2 && (
                  <JssLink
                    field={props.fields.CTA2}
                    className={
                      props?.fields?.CTA2?.value?.href
                        ? `transition-all hover:bg-white hover:text-aubergine flex items-center leading-normal tracking-[0.56px] h-[49px] rounded-[100px] bg-transparent ${textWhite()}  border-2 px-[33px] text-[14px] font-bold leading-none mb-[30px] lg:mb-0`
                        : ''
                    }
                  />
                )}
              </div>
            </div>
            {props?.fields?.ForegroundImage && (
              <div className="image-section">
                <Image
                  field={props?.fields?.ForegroundImage}
                  className="h-[410px] lg:h-auto m-auto"
                />
              </div>
            )}
          </div>
        </div>
      )}
      {Object.keys(props?.rendering?.placeholders ?? {}).map((phKey, index) => {
        return (
          <div key={`teaser-row-${index * 1}`}>
            <Placeholder name={phKey} rendering={props.rendering} />
          </div>
        );
      })}
    </div>
  );
};

export default withDatasourceCheck()<HeroBannerProps>(HeroBanner);
