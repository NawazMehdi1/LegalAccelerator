import { ImageField, RichText, Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import BlockQuotes from 'core/atoms/Icons/BlockQuotes';
import Image from 'core/atoms/Image';
import { ComponentProps } from 'lib/component-props';
import { DeepPartial } from 'src/global';

interface FieldValue<T> {
  value: T;
}
type QuoteBlockProps = ComponentProps &
  DeepPartial<{
    fields: {
      Quote: FieldValue<string>;
      QuoteBy: FieldValue<string>;
      QuoteBySubText: FieldValue<string>;
      QuoteImage: ImageField;
    };
  }>;

const QuoteBlock = (props: QuoteBlockProps): JSX.Element => {
  const hasValues =
    props?.fields?.Quote?.value ||
    props?.fields?.QuoteBy?.value ||
    props?.fields?.QuoteImage?.value?.src;
  if (!hasValues) {
    return <></>;
  }

  const isQuoteTextPresent = props?.fields?.Quote?.value != '';

  return (
    <div className="bg-mainPurple h-[100%] w-[100%] pl-[18px] pr-[22px] lg:px-[100px] pt-[40px] pb-[14px] lg:pt-[60px] lg:pb-[84px]">
      <div className="flex flex-col-reverse max-w-[1260px] md:flex-row w-[100%] mx-auto">
        <div className="pb-[56px] md:pb-[49px] pt-[36px] pr-[34px] pl-[35px] md:pt-[49px] md:pr-[120px] md:pl-[48px] flex-grow bg-white">
          <div className="flex flex-col lg:flex-row">
            {isQuoteTextPresent && (
              <div className="mr-[29px]">
                <BlockQuotes fill="#231F20" height={37} width={56} />
              </div>
            )}

            <div className="flex flex-col max-w-[547px] ">
              <RichText
                field={props?.fields?.Quote}
                tag="blockquote"
                className="md:mb-[20px] mb-[38px] text-black xl:quote-desktop mt-[20px] lg:mt-0 [&>*]:quote-mobile [&>*]:lg:quote-desktop leading-normal tracking-[-0.56px] break-words eespacing"
              />

              <Text
                tag="p"
                className="font-bold text-black leading-normal text-ellipsis overflow-hidden whitespace-nowrap"
                field={props?.fields?.QuoteBy}
              />
              <Text
                tag="p"
                className="text-ellipsis text-black overflow-hidden whitespace-nowrap leading-[156%]"
                field={props?.fields?.QuoteBySubText}
              />
            </div>
          </div>
        </div>
        {props?.fields?.QuoteImage?.value && (
          <Image
            field={props?.fields?.QuoteImage}
            className="lg:w-[440px] lg:min-h-[479px] h-auto quote-side-img"
          />
        )}
      </div>
    </div>
  );
};
export default withDatasourceCheck()<QuoteBlockProps>(QuoteBlock);
