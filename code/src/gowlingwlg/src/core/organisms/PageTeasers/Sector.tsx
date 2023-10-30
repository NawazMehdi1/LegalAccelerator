import LeftNavigateIcon from '../../atoms/Icons/LeftNavigateIcon';
import RightNavigateIcon from '../../atoms/Icons/RightNavigateIcon';
import { SectorType, bgType, styleType } from './types';
import {
  Text,
  RichText as JssRichText,
  withDatasourceCheck,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Image from '../../atoms/Image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const Slider = dynamic(() => import('react-slick').then((m) => m.default), {
  ssr: false,
});
declare global {
  interface Window {
    sectorDataLayer: DataLayerEvent[];
  }
}

interface DataLayerEvent {
  event: string;
  carousel_title?: string;
  carousel_link: string;
}

function NextArrow(props: { onClick?: () => void }) {
  const { onClick } = props;
  return (
    <div
      className="w-[60px] h-[46px] z-[2] bg-maroon hover:brightness-75  absolute bottom-[-120px] hidden md:grid place-content-center cursor-pointer"
      onClick={onClick}
    >
      <LeftNavigateIcon />
    </div>
  );
}

function PrevArrow(props: { onClick?: () => void }) {
  const { onClick } = props;
  return (
    <div
      className="w-[60px] h-[46px] bg-extralightPurple absolute z-[2] bottom-[-120px]  left-[85px] hover:brightness-75 hidden md:grid place-content-center cursor-pointer"
      onClick={onClick}
    >
      <RightNavigateIcon />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  variableWidth: false,
  nextArrow: <PrevArrow />,
  prevArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const handleCarouselClick = (title: string, link: string) => {
  const eventData: DataLayerEvent = {
    event: 'multi_card_carousel_click',
    carousel_title: title,
    carousel_link: link,
  };
  window.dataLayer.push(eventData);
};
const PageTeasers = ({ fields, params }: SectorType): JSX.Element => {
  const sectorTitle = fields?.PageReferences?.map((item) => item?.fields?.Title?.value);
  const { sitecoreContext } = useSitecoreContext();
  const param = (params?.Styles as bgType) || 'bg-mainPurple';
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';

  const style = {
    testColor: 'text-white',
    tileCardBg: 'bg-white',
  } as styleType;

  if (param === bgType.white) {
    style.testColor = 'text-black';
    style.tileCardBg = 'bg-extraLightGrey';
  }

  const hasValues =
    fields?.Title?.value ||
    fields?.Description?.value ||
    fields?.PageReferences.length ||
    isEditing;
  if (!hasValues) {
    return <></>;
  }
  return (
    <>
      <Head>
        <meta name="sectors" content={sectorTitle?.toString()} />
      </Head>
      <section className={param}>
        <div className="p-[1.313rem] md:pl-0 max-w-[1200px] 2xl:max-w-[1440px] m-auto w-full pt-[52px] md:pt-[142px] pb-[108px] md:pb-[180px] ">
          <header
            className={`w-full flex md:items-center box-border flex-col md:flex-row gap-x-[140px]`}
          >
            <Text
              field={fields?.Title}
              tag="h2"
              className={`${style.testColor} mb-4 md:mb-0 text-[32px] md:text-[60px] md:tracking-[-1.2px] tracking-[-0.64px] font-bold font-gowlingBliss leading-normal  `}
            />

            <JssRichText
              field={fields?.Description}
              className={` ${!fields?.Title?.value ? 'w-full' : 'max-w-[755px]'}  ${
                style.testColor
              } [&_*]:leading-[156%] [&_*]:text-base md:leading-normal leading-[156%] md:text-[24px] [&_*]:font-arial [&_*]:font-normal`}
            />
          </header>

          <div className="pb-[30px] relative mt-[33px] md:mt-[76px] sector-react-slick-container md:mr-[-40px]">
            <Slider {...settings}>
              {fields?.PageReferences?.map((page, index) => (
                <Link
                  href={page?.url}
                  className="md:pr-[20px] transition ease-in-out delay-150 md:hover:drop-shadow-xl "
                  key={`${index}-multicard-carousel`}
                  onClick={() => {
                    if (page?.fields?.Title?.value && fields?.CTALink) {
                      handleCarouselClick(page?.fields?.Title?.value || '', page?.url || '');
                    }
                  }}
                >
                  <div className="flex w-full h-full editing_img">
                    <Image
                      field={page?.fields?.ThumbnailImage}
                      className="min-w-[140px]  object-cover"
                    />

                    <div
                      className={`pl-[20px] md:pl-[26px] pr-[17px] py-[27px] ${style.tileCardBg} `}
                    >
                      <div className="text-black leading-normal text-[24px] font-arial font-bold">
                        <Text field={page?.fields?.Title} />
                      </div>
                      <JssRichText
                        field={{
                          ...page?.fields?.Content,
                          value: page?.fields?.Content.value.slice(0, 130),
                        }}
                        className="w-full h-full text-[16px] mt-2 font-normal font-arial leading-[156%] text-black"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default withDatasourceCheck()<SectorType>(PageTeasers);
