import React from 'react';
import {
  Text,
  RichText as JssRichText,
  Link as JssLink,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'core/atoms/ui/accordion';
import { ContentAccordionType, AccordianType } from './contentAccordion.types';

const ContentAccordion = ({ fields }: ContentAccordionType) => {
  const accordianList = fields?.data?.datasource?.referenceItem?.targetItems;
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const allItemArry: string[] = accordianList?.map((_, index: number) => `item-${index}`);
  const [value, setValue] = React.useState<string[]>(isEditing ? allItemArry : ['item-0']);

  if (!accordianList?.length) {
    return <></>;
  }
  return (
    <div className=" bg-white accordion-wrapper w-full">
      <div className="max-w-[1200px] 2xl:max-w-[1440px] mx-[22px] md:mx-[34px] xl:m-auto pt-[48px]  md:pt-[64px] pb-[24px] md:pb-[135px]">
        <Accordion type="multiple" value={value} onValueChange={setValue} className="w-full">
          {accordianList?.map((accordian: AccordianType, index: number) => {
            // Below conditions are as per acceptance criteria

            // 1. if If only title and CTA is added, title shall work as a CTA with no accordion icon and shall navigate the user to the linked page in the same tab.
            if (
              !accordian?.Description?.jsonValue?.value &&
              accordian?.CallToAction?.jsonValue?.value?.href &&
              accordian?.title?.jsonValue?.value
            ) {
              return (
                <AccordionItem
                  className="flex h-[4.94rem] justify-between items-center text-4xl tracking-[-0.04rem] text-black"
                  value={`item-${index}`}
                  key={accordian?.title?.jsonValue?.value}
                >
                  <JssLink
                    field={{
                      ...accordian?.CallToAction?.jsonValue?.value,
                      text: accordian?.title?.jsonValue?.value,
                    }}
                    className="text-black font-gowlingBliss text-[32px] font-bold leading-normal tracking-[-0.64px]"
                  />
                </AccordionItem>
              );
            }
            // 2. If only title is added, then the title shall act as a label only.
            if (
              !accordian?.Description?.jsonValue?.value &&
              !accordian?.CallToAction?.jsonValue?.value?.href &&
              accordian?.title?.jsonValue?.value
            ) {
              return (
                <AccordionItem
                  value={`item-${index}`}
                  key={accordian?.title?.jsonValue?.value}
                  className="flex h-[4.94rem] justify-between items-center text-4xl tracking-[-0.04rem] text-black"
                >
                  <Text
                    field={accordian?.title?.jsonValue}
                    className="text-black leading-normal"
                    tag="h4"
                  />
                </AccordionItem>
              );
            }

            // 3. if all fields are empty
            if (
              !accordian?.Description?.jsonValue?.value &&
              !accordian?.CallToAction?.jsonValue?.value?.href &&
              !accordian?.title?.jsonValue?.value
            ) {
              return null;
            }
            // 4. if all the fields are available
            return (
              <AccordionItem value={`item-${index}`} key={accordian?.title?.jsonValue?.value}>
                <AccordionTrigger className="inline-block">
                  <Text
                    field={accordian?.title?.jsonValue}
                    className="text-black leading-normal"
                    tag="h4"
                  />
                </AccordionTrigger>

                <AccordionContent>
                  <JssRichText
                    field={accordian?.Description?.jsonValue}
                    tag="p"
                    className="text-base text-trueBlack font-normal font-arial leading-[156%] tracking-[-0.6px]"
                  />
                  {accordian?.CallToAction?.jsonValue?.value?.text ? (
                    <JssLink
                      field={{
                        ...accordian?.CallToAction?.jsonValue,
                        text: accordian?.CallToAction?.jsonValue?.value?.text?.slice(0, 100),
                      }}
                      className={
                        'mb-[0.875rem] md:hover:bg-aubergine md:hover:font-bold py-[0.75rem] px-[0.938rem] w-[fit-content] text-white  transition ease-in-out delay-100 md:text-[12px] text-[10px] font-normal md:leading-[101%] leading-[140%] md:tracking-[-0.12px]  font-arial w-[120px] h-[36px] bg-lightPurple rounded-xxl grid place-items-center mt-[1.25rem] md:min-w-[5.843rem]'
                      }
                    />
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<ContentAccordionType>(ContentAccordion);
