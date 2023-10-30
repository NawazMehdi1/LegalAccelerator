import {
  Text,
  Field,
  RichText as JssRichText,
  ImageField,
  LinkField,
  Link as JssLink,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Image from 'core/atoms/Image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'core/atoms/ui/accordion';
import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';

type AccordianType = {
  displayName: Field<string>;
  fields: {
    Description: Field<string>;
    CTA: LinkField;
    Image: ImageField;
    Title: Field<string>;
    TitleLink: LinkField;
  };
  id: string;
  name: Field<string>;
};

export type AccordianProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    AccordianList: Array<AccordianType>;
  };
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
const Accordian = ({ fields }: AccordianProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const hasValues =
    fields?.Description?.value || fields?.Title?.value || fields?.AccordianList?.length;

  const allItemArry: string[] = fields?.AccordianList?.map(
    (_accordian: AccordianType, index: number) => {
      return `item-${index}`;
    }
  );
  const item = [];

  const ItemChecks = () => {
    fields.AccordianList.map((items) => {
      if (items.fields.Title.value != '') {
        item.push(items.fields.Title);
      }
    });
  };
  ItemChecks();

  let itemIndex = 0;
  for (let i = 0; i < fields.AccordianList.length; i++) {
    if (fields.AccordianList[i].fields.Title.value != '') {
      itemIndex = i;
      break;
    }
  }

  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;
  const [value, setValue] = React.useState<Array<string>>(
    isEditing ? allItemArry : [`item-${itemIndex}`]
  );
  if (item.length == 0) {
    return <></>;
  }

  if (!hasValues) {
    return <></>;
  }

  const handleAccordionClick = (title: string) => {
    const eventData: DataLayerEvent = {
      event: 'accordion_click',
      accordion_title: title,
    };
    window.dataLayer.push(eventData);
  };
  return (
    <section className=" bg-extraLightGrey accordion-wrapper w-full accordion-wrapper">
      <div className="max-w-[1200px] 2xl:max-w-[1440px] mx-[22px] md:mx-[34px] xl:m-auto pt-[48px]  md:pt-[64px] pb-[24px] md:pb-[135px]">
        {fields?.Description?.value || fields?.Title?.value || isEditing ? (
          <header className={` w-full flex flex-col gap-[10%] md:flex-row pb-[36px] md:pb-[64px] `}>
            <Text
              tag="h2"
              field={fields?.Title}
              className="min-w-[100%] text-black leading-[121%] tracking-[-0.6px] md:min-w-[40%] text-[36px] md:text-6xl"
            />
            <JssRichText
              field={fields?.Description}
              tag="p"
              className="mt-4 md:mt-0 text-black tracking-[-0.24px] text-2xl font-arial font-normal leading-[173.5%] flex-grow"
            />
          </header>
        ) : null}

        <div className="border-b-[1px] border-b-aubergine" data-testid="accordian" />
        <Accordion type="multiple" value={value} onValueChange={setValue} className="w-full">
          {fields?.AccordianList?.map((accordian: AccordianType, index: number) => {
            return (
              (accordian?.fields?.Title?.value != '' || isEditing) && (
                <AccordionItem value={`item-${index}`} key={accordian?.id}>
                  {accordian?.fields?.Description.value != '' ||
                  accordian?.fields?.CTA?.value?.href != '' ||
                  accordian?.fields?.Image.value?.asset != null ? (
                    <>
                      <AccordionTrigger
                        className="inline-block text-black leading-normal"
                        onClick={() => handleAccordionClick(accordian?.fields?.Title?.value)}
                      >
                        {accordian?.fields?.TitleLink.value.href != '' ? (
                          <>
                            {accordian?.fields?.TitleLink?.value?.linktype == 'external' ? (
                              <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <JssLink field={accordian?.fields?.TitleLink}>
                                      <Text field={accordian?.fields?.Title} />
                                    </JssLink>
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="bottom"
                                    className="p-0 max-w-[180px] border-none"
                                  >
                                    <div
                                      className="text-[0.625rem]"
                                      dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}
                                    ></div>

                                    <TooltipArrow className="fill-white h-2 w-6 " />
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ) : (
                              <JssLink field={accordian?.fields?.TitleLink}>
                                <Text field={accordian?.fields?.Title} />
                              </JssLink>
                            )}
                          </>
                        ) : (
                          <Text field={accordian?.fields?.Title} />
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          className={`w-full flex flex-col gap-[15%] md:flex-row pt-[19px] pb-[42px] pr-[15%] md:pb-16`}
                        >
                          <div className="w-full">
                            <JssRichText
                              field={accordian?.fields?.Description}
                              className=" text-base text-black font-normal font-arial leading-[156%] tracking-[-0.6px]"
                            />
                            {(accordian?.fields?.CTA?.value?.text || isEditing) && (
                              <JssLink
                                field={accordian?.fields?.CTA}
                                className={
                                  'md:hover:bg-aubergine text-white max-w-max py-[1.375rem] px-[2.875rem] transition ease-in-out delay-100 md:text-[12px] text-[10px] font-normal md:leading-[101%] leading-[140%] md:tracking-[-0.12px] mt-8 md:mt-12 font-arial bg-purple rounded-xxl grid place-items-center'
                                }
                              />
                            )}
                          </div>
                          <Image
                            field={accordian?.fields?.Image}
                            className="max-h-[246px] max-w-[379px] hidden md:block"
                          />
                        </div>
                      </AccordionContent>
                    </>
                  ) : (
                    <AccordionTrigger
                      className="text-black leading-normal hidden"
                      onClick={() => handleAccordionClick(accordian?.fields?.Title?.value)}
                    >
                      {accordian?.fields?.TitleLink.value.href != '' ? (
                        <>
                          {accordian?.fields?.TitleLink?.value?.linktype == 'external' ? (
                            <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <JssLink field={accordian?.fields?.TitleLink}>
                                    <Text field={accordian?.fields?.Title} />
                                  </JssLink>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="bottom"
                                  className="p-0 max-w-[180px] border-none"
                                >
                                  <div
                                    className="text-[0.625rem]"
                                    dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}
                                  ></div>

                                  <TooltipArrow className="fill-white h-2 w-6 " />
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <JssLink field={accordian?.fields?.TitleLink}>
                              <Text field={accordian?.fields?.Title} />
                            </JssLink>
                          )}
                        </>
                      ) : (
                        <Text field={accordian?.fields?.Title} />
                      )}
                    </AccordionTrigger>
                  )}
                </AccordionItem>
              )
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<AccordianProps>(Accordian);
