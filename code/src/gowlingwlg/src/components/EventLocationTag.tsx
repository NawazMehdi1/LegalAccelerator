import { ImageField, LinkField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import Link from 'next/link';
import { getAdddress } from 'utils/address';

type EventLocationTagProps = ComponentProps & {
  fields: {
    AlternateImage: ImageField;
    OverrideTitle?: TextField;
    City: TextField;
    ['Building Name']: TextField;
    ['Address 1']: TextField;
    ['Address 2']: TextField;
    ['Address 3']: TextField;
    Country: TextField;
    ['Postal Code']: TextField;
    State: TextField;
    ['Map URL']: LinkField;
  };
};

const EventLocationTag = (props: EventLocationTagProps) => {
  const { t } = useI18n();
  return (
    <Link href={props.fields?.['Map URL']?.value?.href || '#'} target="_blank">
      <div className="group bg-lightGrey flex flex-col md:flex-row items-stretch gap-0 md:gap-10 cursor-pointer">
        <div className="flex flex-col aspect-[16/9] md:aspect-[19/22] w-full md:w-[11.875rem] overflow-hidden">
          <Image
            field={props?.fields?.AlternateImage}
            className="object-cover h-full group-hover:scale-125 transform transition duration-500"
          />
        </div>
        <div className="flex flex-col items-stretch mx-5 mt-5 mb-14 md:w-full md:mx-0 md:my-auto max-w-[20rem]">
          <div className="text-stone-800 text-3xl font-bold tracking-tighter">
            {props?.params?.OverrideTitle || t('EventLocationTitle')}
          </div>
          <div className="text-stone-800 text-base leading-6 mt-5">{getAdddress(props.fields)}</div>
        </div>
      </div>
    </Link>
  );
};

export default EventLocationTag;
