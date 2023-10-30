import { useState, useEffect, useLayoutEffect } from 'react';
import { LanguageSelectorProps, Regions, formType } from './LanguageSelector.types';
import { Dialog, DialogContent } from 'core/atoms/ui/dialog';
import { useSitecoreContext, Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'core/atoms/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'core/atoms/ui/form';
import { cn } from 'lib/utils';
import { useForm } from 'react-hook-form';
import Image from 'core/atoms/Image';
import { setCookie } from 'cookies-next';
import { useAtom } from 'jotai';
import { hamburgerMenuVisibilityAtom } from '../../core/molecule state/visibilityAtom';

declare global {
  interface Window {
    dataLayerLanguageSelector: DataLayerEvent[];
  }
}

interface DataLayerEvent {
  event: string;
  location?: string;
  language?: string;
}
const handleConfirmClick = (location: string, language: string) => {
  const eventData: DataLayerEvent = {
    event: 'region_language_selector',
    location: location,
    language: language,
  };
  window.dataLayer.push(eventData);
};
const LanguageSelector = ({ fields }: LanguageSelectorProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const defaultRegion = fields?.data?.item?.Jurisdiction?.targetItems?.filter((obj) => {
    return obj?.Name?.jsonValue?.value == Regions[sitecoreContext?.language || 'en'];
  })[0];

  const defaultLanguage = defaultRegion?.LanguageMapping?.targetItems?.filter((obj) => {
    return obj?.Code?.jsonValue?.value == sitecoreContext?.language;
  })[0];

  const [open, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(defaultLanguage);
  const [location, setLocation] = useState(defaultRegion);
  const [isHamburgerMenuVisible] = useAtom(hamburgerMenuVisibilityAtom);

  useEffect(() => {
    setCookie('language', language?.Code?.jsonValue?.value, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    setCookie('location', location?.Code?.jsonValue?.value, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
  }, [language, location]);

  const form = useForm({
    defaultValues: {
      language: defaultLanguage?.Code?.jsonValue?.value || 'en',
      location: defaultRegion?.Name?.jsonValue?.value || 'Global',
    },
  });

  const onSubmitHandler = (data: formType) => {
    const locationObj = fields?.data?.item?.Jurisdiction?.targetItems?.filter((obj) => {
      return obj?.Name?.jsonValue?.value == data?.location;
    })[0];

    const languageObj = locationObj?.LanguageMapping?.targetItems?.filter((obj) => {
      return obj.Code?.jsonValue?.value == data?.language;
    })[0];

    handleConfirmClick(data.location, data.language);
    // To handle Sitecore global language settings
    // Global+English is /en and UnitedKingdom+English is /en-GB
    const locale = languageObj?.Code?.jsonValue?.value;

    window.location.replace(
      `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/${locale}${
        sitecoreContext?.itemPath as string
      }`
    );
    setLanguage(languageObj);
    setLocation(locationObj);
    setIsOpen(false);
  };
  const [width] = useWindowSize();
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  return (
    <div
      className={`${
        isHamburgerMenuVisible ? '' : 'hidden md:block'
      } pr-[1.313rem] pl-[1rem] md:pt-[0.781rem] pt-[0.125rem] md:pr-[1.5rem] md:pl-0 flex flex-col items-end`}
    >
      <div
        role="button"
        className="flex items-center cursor-pointer h-[26px] md:h-[1.5rem] md:bg-transparent w-[387x] "
        onClick={() => setIsOpen(true)}
      >
        <div className="h-full md:w-[31px] md:bg-white md:h-[1.375rem]">
          {width > 768 ? (
            <Image field={location?.Flag?.jsonValue} className="h-full" />
          ) : (
            <Image field={location?.FlagMobile?.jsonValue} className="h-full" />
          )}
        </div>
        <div className="hidden md:grid bg-extraLightGrey h-full text-xs leading-6 font-bold text-aubergine font-arial place-items-center px-[4px] md:h-[1.375rem] md:w-[1.563rem]">
          {language?.Code?.jsonValue?.value.split('-')[0]?.toUpperCase()}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent className={cn(' md:pl-11')}>
          <div className="mt-8 md:mt-4 ">
            <Text
              tag="h3"
              field={fields?.data?.item?.Title?.jsonValue}
              className="text-[32px] text-black font-normal md:font-bold font-arial leading-normal md:font-gowlingBliss"
            />
            <Text
              tag="p"
              field={fields?.data?.item?.Description?.jsonValue}
              className=" text-base text-black font-arial mt-[19px] md:mt-2 font-normal  leading-6 w-full md:w-5/6 "
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)} className="pt-4 pr-0 md:pr-7 ">
              <div className=" grid grid-cols-12 items-center  md:gap-x-10 gap-y-7">
                <div className="col-span-12 md:col-span-6 flex flex-col w-full   gap-y-1.5">
                  <FormField
                    control={form.control}
                    name="location"
                    defaultValue={'Global'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-aubergine  md:text-black pl-3 text-2xl font-normal font-arial leading-normal">
                          <Text field={fields?.data?.item?.JurisdictionTitle?.jsonValue} />
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl className="py-5 px-3 rounded-xxl">
                            <SelectTrigger className="!border-black text-black leading-6 font-arial text-[15px] py-[11px] px-[25px]">
                              <SelectValue
                                placeholder={
                                  <>
                                    <div className=" flex gap-[6px] items-center">
                                      <div className="h-[22px] w-[33px] inline-block">
                                        <Image field={location?.Flag?.jsonValue} />
                                      </div>
                                      <div>{location?.Name?.jsonValue?.value}</div>
                                    </div>
                                  </>
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fields?.data?.item?.Jurisdiction?.targetItems
                              ?.slice()
                              .sort((a, b) => {
                                const nameA = a?.Name?.jsonValue?.value?.toLowerCase();
                                const nameB = b?.Name?.jsonValue?.value?.toLowerCase();

                                if (nameA === 'global') {
                                  return -1;
                                } else if (nameB === 'global') {
                                  return 1;
                                } else {
                                  if (nameA < nameB) return -1;
                                  if (nameA > nameB) return 1;
                                  return 0;
                                }
                              })
                              .map((location, index) => (
                                <SelectItem
                                  key={index + location?.Code?.jsonValue?.value}
                                  value={location?.Name?.jsonValue?.value}
                                  className="hover:font-semibold"
                                >
                                  <div className=" flex gap-[6px] items-center">
                                    <div className="h-[22px] w-[33px] inline-block">
                                      <Image field={location?.Flag?.jsonValue} />
                                    </div>
                                    <div>{location?.Name?.jsonValue?.value}</div>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-col w-full   gap-y-1.5">
                  <FormField
                    control={form.control}
                    name="language"
                    defaultValue={'English'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-aubergine  md:text-black pl-3 text-2xl leading-normal font-normal font-arial">
                          <Text field={fields?.data?.item?.LanguageTitle?.jsonValue} />
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl className="py-5 px-3 rounded-xxl">
                            <SelectTrigger className="!border-black text-black leading-6 font-arial  text-[15px] py-[11px] px-[25px]">
                              <SelectValue placeholder={language?.Name?.jsonValue?.value} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fields?.data?.item?.Jurisdiction?.targetItems
                              .filter(
                                (obj) => obj?.Name?.jsonValue?.value == form.watch('location')
                              )[0]
                              ?.LanguageMapping?.targetItems?.map((language, index) => (
                                <SelectItem
                                  key={language?.Name?.jsonValue?.value + index}
                                  value={language?.Code?.jsonValue?.value}
                                  className="hover:font-semibold"
                                >
                                  {language?.Name?.jsonValue?.value}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 w-full md:flex md:justify-between items-center  mt-9">
                <Link
                  field={fields?.data?.item?.GlobalDirectUrl?.jsonValue}
                  className="col-span-12 md:col-span-10 text-center pt-[78px] pb-2 md:pb-0 md:pt-0 order-2 md:order-1 text-black md:text-mainPurple font-arial font-normal leading-[140%] cursor-pointer text-[1rem] md:leading-[156%]"
                />
                <div className="order-1 bg-important col-span-12 md:col-span-2 md:order-2  flex justify-end">
                  <button
                    className="!bg-mainPurple !min-w-[171px] flex justify-center  items-center  !py-[17px] !px-[41px] rounded-xxl text-aubergine text-base font-normal font-arial !leading-normal md:!min-w-[162px] !text-[14px] !min-h-[auto] hover:!bg-aubergine"
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LanguageSelector;
