import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';

type targetItemsType = {
  title: Field<string>;
  url: {
    path: string;
  };
};

type RelatedSectorsProps = ComponentProps & {
  fields: {
    data: {
      item: { relatedSectors?: { targetItems?: Array<targetItemsType> } };
    };
  };
};

const RelatedSectors = (props: RelatedSectorsProps): JSX.Element => {
  const { t } = useI18n();
  if (!props?.fields?.data?.item?.relatedSectors?.targetItems?.length) {
    return <></>;
  }
  return (
    <div className="related-topic" data-testid="related-topics">
      <div className="max-w-[1200px] 2xl:max-w-[1440px] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto py-[3.5rem]">
        <div className=" text-aubergine mb-[2.5rem] font-gowlingBliss text-[2rem] md:text-[3rem] font-bold leading-normal md:leading-[155%] tracking-[-0.04rem] md:tracking-[-0.03rem]">
          {t('RelatedSectors')}
        </div>

        <div className="flex flex-col md:flex-wrap print:flex print:flex-row gap-y-[1.25rem] md:flex-row">
          {props?.fields?.data?.item?.relatedSectors?.targetItems?.map(
            (item: targetItemsType, index: number) => (
              <a
                key={index}
                href={props?.fields?.data?.item?.relatedSectors?.targetItems?.[index]?.url?.path}
                className={`font-arial text-base font-bold leading-normal text-black md:hover:text-purple  transition-all ease-in-out delay-50 px-[1.25rem] py-1 border-l border-[#231F20] flex items-center h-[2.5rem] md:hover:border-l-purple cursor-pointer  `}
              >
                {item?.title?.value}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedSectors;
