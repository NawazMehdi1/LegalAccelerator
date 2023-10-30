import React, { useEffect, useState } from 'react';
import { Text, TextField, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import { useI18n } from 'next-localization';

interface FieldValue<T> {
  jsonValue: TextField | undefined;
  value: T;
}

type CountryListProps = ComponentProps & {
  fields: {
    data: {
      contextItem: {
        children: {
          results: CountryListType[];
        };
      };
      officeIcon: { Image: { jsonValue: ImageField } };
    };
  };
};

type CountryListType = {
  id: FieldValue<string>;
  url: { path: string };
  title: { jsonValue: FieldValue<string> };
  content: { jsonValue: FieldValue<string> };
  offices: { targetItems: OfficeType[] };
};

type OfficeType = {
  title: FieldValue<string>;
  url: { path: string };
};

const CountryList = (props: CountryListProps): JSX.Element => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { t } = useI18n();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleItem = (index: string) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((itemIndex) => itemIndex !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const Column = ({ item, index }: { item: CountryListType; index: string }) => {
    const isContestLessThanLimit = item?.content?.jsonValue?.value.length < 1000;
    return (
      <div className="tile px-[20px] md:px-[10px] text-base font-bold flex flex-col text-black">
        <div
          className={`flex items-center p-20 justify-between ${
            expandedItems.includes(index) ? '' : 'border-b-[1px] border-solid border-black'
          }`}
        >
          <Link href={item?.url?.path || '#'}>
            <Text
              field={{
                ...item?.title?.jsonValue,
                value: item?.title?.jsonValue?.value?.slice(0, 50),
              }}
              className="md:hover:scale-125 overflow-hidden line-clamp-2 "
            />
          </Link>
          <div className="flex items-center">
            {item?.offices?.targetItems.length > 0 && (
              <Image
                className="pr-[10px]"
                field={props?.fields?.data?.officeIcon?.Image?.jsonValue}
              />
            )}
            <div
              className="toggle-icon text-white border border-solid border-darkMaroon rounded-full pl-[10px] pr-[12px] py-[2px] bg-maroon cursor-pointer ml-2 hover:bg-darkMaroon "
              onClick={() => {
                toggleItem(index);
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '12px',
                  display: 'inline-block',
                  textAlign: 'center',
                }}
              >
                {expandedItems.includes(index) ? '-' : '+'}
              </span>
            </div>
          </div>
        </div>
        {expandedItems.includes(index) && (
          <>
            <div className="tile-content font-normal mt-4 p-20 overflow-hidden">
              <Text
                field={{
                  ...item?.content?.jsonValue,
                  value: isContestLessThanLimit
                    ? item?.content?.jsonValue?.value?.slice(0, 1000)
                    : item?.content?.jsonValue?.value?.slice(0, 1000) + '...',
                }}
              />
            </div>
            <br />
            <Link href={item?.url?.path || '#'}>
              <p className="text-darkBlue px-20 md:hover:text-darkBlue text-base font-bold">
                {' '}
                {t('LearnMore')}
              </p>
            </Link>
            <br />
            {item?.offices?.targetItems.length > 0 && (
              <p className="text-darkMaroon font-bold px-20 text-base mb-2"> {t('Offices')}</p>
            )}
            {item?.offices?.targetItems.map((offices: OfficeType, index: number) => {
              return (
                <Link
                  href={offices?.url?.path}
                  key={`countrylist- ${index}`}
                  className="text-base font-bold px-20 pb-[5px]"
                >
                  {offices?.title?.jsonValue?.value}
                </Link>
              );
            })}
          </>
        )}
      </div>
    );
  };

  function splitArrayWithPattern(array: CountryListType[], parts: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splitArray: any[] = Array.from({ length: parts }, () => []);

    for (let i = 0; i < array.length; i++) {
      const partIndex = i % parts;
      splitArray[partIndex].push(array[i]);
    }

    return splitArray;
  }
  const CountriesInColumns = splitArrayWithPattern(
    props?.fields?.data?.contextItem?.children?.results,
    4
  );

  return (
    <div className="container-fluid">
      <section className="max-w-[1200px] 2xl:max-w-[1440px] mx-auto md:flex pt-[60px] md:py-[50px]">
        {CountriesInColumns.map((item, index) => {
          return (
            <div key={`map-columns-${index}`} className=" md:w-[25%]">
              {item.map((item: CountryListType, i: number) => {
                return (
                  <Column key={`country-accordian-item-${i}`} item={item} index={`${index}-${i}`} />
                );
              })}
            </div>
          );
        })}
      </section>

      <div className="flex items-center md:ml-[80px] md:mb-[50px] md:mt-[0px] m-[25px]">
        <Image className="pr-[10px]" field={props?.fields?.data?.officeIcon?.Image?.jsonValue} />
        <span className="pl-[10px] font-base font-bold text-black">
          {isMobile ? 'Has Office Locations' : 'Office Location'}
        </span>
      </div>
    </div>
  );
};

export default CountryList;
