import {
  RichText,
  Placeholder,
  Field,
  ComponentParams,
  ComponentRendering,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'core/atoms/ui/accordion';
import React, { useEffect, useState } from 'react';
import ClientWorks from '../ClientWork/ClientWork';
import { useQuery } from '@tanstack/react-query';
import AwardsSearchQueryFn from '../../core/api/queries/AwardsSearchQueryFn';
import AwardsComponent from '../../core/atoms/Awards/Awards';
import useLanguageHook from '../../core/hooks/useLanguageHook';

export interface Widgets {
  widgets: {
    total_item: number;
    content: Array<Awards>;
  }[];
}

export interface Awards {
  image_url: string;
  published_date: string;
  name: string;
  id: string;
  page_type: string;
  url: string;
  page_type_icon: string;
}

interface RouteFields {
  [key: string]: unknown;
  Title: Field<string>;
}

type BioAccordionProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: Array<BioAccordianType>;
        };
      };
    };
  };
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};

type BioAccordianType = {
  accordionTitle: {
    jsonValue: Field<string>;
  };
  dataItems?: {
    targetItems?: Array<QualificationAccordianType>;
  };
  name: string;
};

type QualificationAccordianType = {
  title?: {
    jsonValue?: Field<string>;
  };
  template?: {
    name?: string;
  };
  text?: {
    jsonValue?: Field<string>;
  };

  children?: {
    results?: Array<QualificationItemType>;
  };
  spokenLanguages: {
    targetItems: Array<LanguageSpokenType>;
  };
  spokenLanguagesheading: {
    jsonValue: {
      value: string;
    };
  };
};

type LanguageSpokenType = {
  fields: Array<LanguageItem>;
};

type LanguageItem = {
  name: string;
  jsonValue: Field<string>;
};

type QualificationItemType = {
  template: {
    name: string;
  };
  fields: Array<QualificationCategoryType>;
  spokenLanguagesheading: {
    jsonValue: {
      value: string;
    };
  };
};

type QualificationCategoryType = {
  name: string;
  jsonValue: Field<string>;
};

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

interface DataLayerEvent {
  event: string;
  accordion_title?: string;
}

const BioAccordion = (props: BioAccordionProps): JSX.Element => {
  const { language, country } = useLanguageHook();
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const allItemArry: string[] = props?.fields?.data?.item?.children?.results?.map(
    (_accordian: BioAccordianType, index: number) => {
      return `item-${index}`;
    }
  );
  const [AwardsItems, setAwardsItems] = useState<Awards[]>([]);
  const fieldsIte = sitecoreContext?.route?.fields as RouteFields;
  const searchApiUrl = sitecoreContext?.SearchApiUrl as string;
  const searchSource = sitecoreContext?.SearchSource as string;
  const searchProfileName = fieldsIte?.Title?.value;
  const { data } = useQuery({
    queryKey: ['Awards', { searchProfileName }],
    queryFn: () =>
      AwardsSearchQueryFn(searchApiUrl, {
        searchSource,
        searchProfileName,
        language,
        country,
      }),
  });

  useEffect(() => {
    if (data) {
      setAwardsItems(data?.widgets?.[0]?.content);
    }
  }, [data]);

  const awardList = AwardsItems;
  const clientWork = ClientWorks.length;

  const [value, setValue] = React.useState<Array<string>>(isEditing ? allItemArry : ['item-0']);
  const handleAccordionClick = (title: string) => {
    const eventData: DataLayerEvent = {
      event: 'accordion_click',
      accordion_title: title,
    };
    window.dataLayer.push(eventData);
  };
  return (
    <div className=" bg-extraLightGrey">
      <div className="max-w-[1200px] 2xl:max-w-[1440px] mx-[22px] md:mx-[34px] xl:mx-auto pt-[48px]  md:pt-[64px] pb-[59px] md:pb-[80px] BioAccordion-Wrapper">
        <div className="border-b-[1px] border-b-aubergine" data-testid="accordian" />
        <Accordion type="multiple" value={value} onValueChange={setValue} className="w-full">
          {props?.fields?.data?.item?.children?.results?.map(
            (accordian: BioAccordianType, index: number) => {
              const AccordionTitle = accordian?.accordionTitle?.jsonValue?.value;
              const AccordianName = accordian?.name;
              const hasData = accordian?.dataItems?.targetItems?.[0]?.text?.jsonValue?.value;
              if (hasData === '') {
                return <></>;
              }

              return accordian?.dataItems?.targetItems?.length !== 0 ||
                (accordian?.name == 'Awards' && awardList) ||
                (accordian?.name == 'Client Work' && clientWork) ? (
                <AccordionItem className="" value={`item-${index}`} key={index}>
                  <AccordionTrigger
                    className="inline-block"
                    onClick={() => handleAccordionClick(AccordionTitle)}
                  >
                    <div className="leading-normal">{AccordionTitle}</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {AccordianName === 'Qualifications' && (
                      <div className={`w-full pt-[0.3125rem] pr-[15%]`}>
                        {accordian?.dataItems?.targetItems?.map(
                          (BioAccordianItem: QualificationAccordianType, index1: number) => {
                            const QualificationItem = BioAccordianItem?.children?.results;
                            const QualificationLanguageItem =
                              BioAccordianItem?.spokenLanguages?.targetItems;
                            const QualificationTextItem = BioAccordianItem?.template?.name;
                            if (QualificationTextItem === 'Text') {
                              return (
                                <>
                                  <RichText
                                    className="w-full mb-[3.125rem] Membership-Accordion leading-normal content-rte"
                                    key={index1}
                                    field={BioAccordianItem?.text?.jsonValue}
                                  />
                                </>
                              );
                            } else {
                              if (QualificationTextItem === 'SpokenLanguages') {
                                return (
                                  <>
                                    <div className="w-full mb-[3.125rem] leading-normal">
                                      <h4 className="link font-bold text-darkMaroon pb-[15px] leading-normal">
                                        {BioAccordianItem?.spokenLanguagesheading?.jsonValue?.value}
                                      </h4>
                                      {QualificationLanguageItem?.map(
                                        (
                                          QualificationLangItem: LanguageSpokenType,
                                          index3: number
                                        ) => {
                                          return (
                                            <div key={index3}>
                                              {QualificationLangItem?.fields?.map(
                                                (
                                                  QualificationLangFieldItem: LanguageItem,
                                                  index4: number
                                                ) => {
                                                  if (
                                                    QualificationLangFieldItem?.name === 'Phrase'
                                                  ) {
                                                    return (
                                                      <div
                                                        className="w-full text-[24px] leading-9"
                                                        key={index4}
                                                      >
                                                        {
                                                          QualificationLangFieldItem?.jsonValue
                                                            ?.value
                                                        }
                                                      </div>
                                                    );
                                                  } else {
                                                    return <></>;
                                                  }
                                                }
                                              )}
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </>
                                );
                              } else {
                                if (BioAccordianItem?.children?.results?.length) {
                                  return (
                                    <>
                                      <div key={index1} className="mb-[1.5625rem]">
                                        <h4 className="link font-bold  text-darkMaroon leading-normal pb-[15px]">
                                          {BioAccordianItem?.title?.jsonValue?.value}
                                        </h4>
                                        {QualificationItem?.map(
                                          (
                                            QualificationItem: QualificationItemType,
                                            index3: number
                                          ) => {
                                            if (
                                              QualificationItem?.template?.name === 'CareerEvent'
                                            ) {
                                              return (
                                                <div
                                                  key={index3}
                                                  className="w-full flex pb-[25px] justify-end flex-row-reverse subtitle"
                                                >
                                                  {QualificationItem.fields?.map(
                                                    (
                                                      QualificationCategory: QualificationCategoryType,
                                                      index4: number
                                                    ) => {
                                                      const CategoryName =
                                                        QualificationCategory?.name;
                                                      return (
                                                        <>
                                                          <div className="flex">
                                                            <div>
                                                              {CategoryName === 'StartYear' && (
                                                                <div
                                                                  key={index4}
                                                                  className="font-bold text-[16px] text-trueBlack w-[85px]"
                                                                >
                                                                  {
                                                                    QualificationCategory?.jsonValue
                                                                      ?.value
                                                                  }
                                                                </div>
                                                              )}{' '}
                                                            </div>
                                                            <div>
                                                              {CategoryName === 'CareerName' && (
                                                                <div
                                                                  key={index4}
                                                                  className=" ps-4 md:ps-5 font-normal text-black "
                                                                >
                                                                  {
                                                                    QualificationCategory?.jsonValue
                                                                      ?.value
                                                                  }
                                                                </div>
                                                              )}{' '}
                                                            </div>
                                                          </div>
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              );
                                            } else if (
                                              QualificationItem?.template?.name === 'EducationEvent'
                                            ) {
                                              return (
                                                <div
                                                  key={index3}
                                                  className="w-full flex pb-[1.5625rem] justify-end flex-row-reverse subtitle"
                                                >
                                                  {QualificationItem.fields?.map(
                                                    (
                                                      QualificationCategory: QualificationCategoryType,
                                                      index4: number
                                                    ) => {
                                                      const CategoryName =
                                                        QualificationCategory?.name;
                                                      return (
                                                        <>
                                                          {CategoryName === 'StartYear' && (
                                                            <div
                                                              key={index4}
                                                              className="float-left flex-initial w-[85px] text-trueBlack text-[16px] font-bold"
                                                            >
                                                              {
                                                                QualificationCategory?.jsonValue
                                                                  ?.value
                                                              }
                                                            </div>
                                                          )}
                                                          {CategoryName === 'UniversityName' && (
                                                            <div
                                                              key={index4}
                                                              className="float-right flex-none w-auto text-Black ps-4 md:ps-5"
                                                            >
                                                              {
                                                                QualificationCategory?.jsonValue
                                                                  ?.value
                                                              }
                                                            </div>
                                                          )}
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              );
                                            } else if (
                                              QualificationItem?.template?.name === 'CommunityEvent'
                                            ) {
                                              return (
                                                <div
                                                  key={index3}
                                                  className="w-full flex pb-[1.5625rem] justify-end flex-row-reverse subtitle"
                                                >
                                                  {QualificationItem.fields?.map(
                                                    (
                                                      QualificationCategory: QualificationCategoryType,
                                                      index4: number
                                                    ) => {
                                                      const CategoryName =
                                                        QualificationCategory?.name;

                                                      return (
                                                        <>
                                                          {CategoryName === 'StartYear' && (
                                                            <div
                                                              key={index4}
                                                              className="float-left flex-initial w-[85px]  text-trueBlack text-[16px] font-bold"
                                                            >
                                                              {
                                                                QualificationCategory?.jsonValue
                                                                  ?.value
                                                              }
                                                            </div>
                                                          )}
                                                          {CategoryName === 'CommunityName' && (
                                                            <div
                                                              key={index4}
                                                              className="float-right flex-none w-auto ps-4 md:ps-5"
                                                            >
                                                              {
                                                                QualificationCategory?.jsonValue
                                                                  ?.value
                                                              }
                                                            </div>
                                                          )}
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              );
                                            } else if (
                                              BioAccordianItem?.template?.name === 'Text'
                                            ) {
                                              return (
                                                <RichText
                                                  className="w-full text-darkMaroon "
                                                  key={index3}
                                                  field={BioAccordianItem?.text?.jsonValue}
                                                />
                                              );
                                            } else {
                                              return <></>;
                                            }
                                          }
                                        )}
                                      </div>
                                    </>
                                  );
                                } else {
                                  return;
                                }
                              }
                            }
                          }
                        )}
                      </div>
                    )}

                    {AccordianName === 'Awards' && (
                      <div className={`w-full pt-[5px] pb-[42px]  pr-[15%] md:pb-13`}>
                        <div className="content-block justify-center items-center ">
                          <div className="w-full  mb[-30px]" style={{ marginBottom: '-40px' }}>
                            {AwardsItems?.map((Awards, index) => {
                              return <AwardsComponent key={index} Awards={Awards} />;
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {AccordianName === 'Client Work' && (
                      <div className={`w-full pt-[5px] pb-[42px] md:pb-13 client-works-wraper`}>
                        {Object.keys(props?.rendering?.placeholders ?? {}).map((phKey, index) => {
                          return (
                            <div key={`bio-row-${index * 1}`}>
                              <Placeholder name={phKey} rendering={props.rendering} />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {(AccordianName == 'Bio' ||
                      AccordianName == 'Experience' ||
                      AccordianName == 'Public Work') && (
                      <div className={`w-full pt-[5px] pr-[34%]  content-rte`}>
                        {accordian?.dataItems?.targetItems?.map(
                          (BioAccordianTextItem: QualificationAccordianType, index1: number) => {
                            return (
                              <RichText
                                className="w-full mb-[25px] leading-normal"
                                key={index1}
                                field={BioAccordianTextItem.text?.jsonValue}
                              />
                            );
                          }
                        )}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ) : null;
            }
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<BioAccordionProps>(BioAccordion);
