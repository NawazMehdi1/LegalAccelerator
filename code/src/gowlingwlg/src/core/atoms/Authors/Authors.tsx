import { Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { AuthorProps, AuthorCardsProps, OfficeType } from './types';
import { useI18n } from 'next-localization';
interface DataLayerEvent {
  event: string;
  author_name?: string | number | undefined;
  author_designation?: string;
  author_location?: string;
}

const Authors = (props: AuthorProps): JSX.Element => {
  const { t } = useI18n();
  const [showAllAuthors, setShowAllAuthors] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const authors = props?.fields?.data?.item?.KeyContacts?.targetItems.map(
    (author: AuthorCardsProps) => author?.alternateTitle?.jsonValue?.value
  );
  const visibleAuthors =
    isDesktop || showAllAuthors
      ? props?.fields?.data?.item?.KeyContacts?.targetItems
      : props?.fields?.data?.item?.KeyContacts?.targetItems.slice(0, 4);
  const ref = useRef<null | HTMLDivElement>(null);
  const handleClick = () => {
    const lastVisibleAuthorIndex = 3;
    const lastVisibleAuthorRef = ref.current?.children[lastVisibleAuthorIndex];

    if (lastVisibleAuthorRef) {
      lastVisibleAuthorRef.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const toggleShowAllAuthors = () => {
    setShowAllAuthors(!showAllAuthors);
  };
  const handleAuthorClick = (
    name: string | number | undefined,
    designation: string,
    authorOffices: OfficeType[],
    additionalOffices: string | undefined
  ) => {
    const allOffices = [...authorOffices.map((office) => office.title.value)];

    if (additionalOffices) {
      allOffices.push(additionalOffices);
    }

    const eventData: DataLayerEvent = {
      event: 'author_click',
      author_name: name,
      author_designation: designation,
      author_location: allOffices.join(','),
    };

    window.dataLayer.push(eventData);
  };

  if (visibleAuthors.length === 0) {
    return <></>;
  }
  return (
    <>
      <Head>
        <meta name="authors" content={authors?.toString()} />
      </Head>
      <div className="container-fluid bg-aubergine ">
        <div
          ref={ref}
          className=" mx-[22px] xl:grid-cols-6 lg:grid-cols-4 print:flex print:flex-wrap md:grid-cols-2 gap-[16px] md:mx-[34px] xl:m-auto md:py-[50px]  md:grid  pt-[37px] pb-0 max-w-[1200px] 2xl:max-w-[1440px]  "
        >
          {visibleAuthors.map((author: AuthorCardsProps, index: number) => {
            const isOfficePresent =
              props?.fields?.data?.item?.KeyContacts?.targetItems[index].offices?.targetItems
                ?.length != 0;
            const isAdditionOfficePresent = author?.AdditionalOffices?.jsonValue?.value;
            const additionalOffices = author?.AdditionalOffices?.jsonValue?.value as string;

            const hasValues =
              author?.profileImage?.jsonValue?.value?.src ||
              author?.alternateTitle.jsonValue?.value ||
              author?.title?.value ||
              author?.professionalTitle?.targetItem?.title.jsonValue?.value ||
              author?.role.value ||
              author?.offices?.targetItems.length ||
              isEditing;
            if (!hasValues) {
              return <></>;
            }

            return (
              <div
                key={index}
                className="container md:[&:not(:last-child)]:border-b-0   md:border-b-0  md:border-l-[1px] border-solid border-white md:border-extralightPurple border-b-[1px]"
              >
                <Link
                  href={author?.url?.path || '#'}
                  onClick={() =>
                    handleAuthorClick(
                      author?.alternateTitle?.jsonValue?.value,
                      author?.professionalTitle?.targetItem?.title?.value,
                      author?.offices?.targetItems || [],
                      additionalOffices
                    )
                  }
                >
                  <article className=" hover:text-shadow-bold mb-5 md:pl-[20px] pt-[25px] md:pt-0 text-white">
                    <Text
                      tag="h2"
                      className="w-auto text-[1.5rem] font-bold pb-[10px] font-arial"
                      field={
                        author?.alternateTitle.jsonValue?.value !== ''
                          ? author?.alternateTitle.jsonValue
                          : author?.title?.jsonValue
                      }
                    />
                    <Text
                      className="font-normal pb-[10px] text-base "
                      tag="p"
                      field={author?.professionalTitle?.targetItem?.title}
                    />
                    <Text
                      className="text-base font-normal pb-[10px]"
                      tag="p"
                      field={author?.role}
                    />
                    <div>
                      <div className="inline">
                        {author?.offices?.targetItems.map((offices: OfficeType, index: number) => {
                          const isLastItem = index === author.offices.targetItems.length - 1;
                          return (
                            <span key={index} className="font-bold text-base ">
                              {offices?.title.value}
                              {isLastItem ? null : ', '}
                            </span>
                          );
                        })}
                      </div>
                      <div className="inline font-bold text-base">
                        {isOfficePresent && isAdditionOfficePresent ? ', ' : null}
                        {author?.AdditionalOffices?.jsonValue?.value}
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
        {!isDesktop && props?.fields?.data?.item?.KeyContacts?.targetItems.length > 4 && (
          <div className="pb-[40px] md:hidden pt-[25px]">
            {showAllAuthors ? (
              <a
                className="text-white text-base font-bold m-[20px] "
                onClick={() => {
                  toggleShowAllAuthors();
                  handleClick();
                }}
              >
                {t('SeeLess')}
              </a>
            ) : (
              <a
                className="text-base font-bold m-[20px] text-white "
                onClick={toggleShowAllAuthors}
              >
                {t('SeeAllAuthors')}
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Authors;
