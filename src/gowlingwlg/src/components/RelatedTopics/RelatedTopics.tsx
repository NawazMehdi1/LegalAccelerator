import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
type targetItemsType = {
  title: Field<string>;
  url: {
    path: string;
  };
};
type jsonValueType = {
  querystring: string;
  href: string;
};

export type RelatedTopicsProps = ComponentProps & {
  fields: {
    data: {
      item: { relatedTopics?: { targetItems?: Array<targetItemsType> } };
      datasource: {
        SeeMore?: {
          jsonValue?: {
            value?: jsonValueType;
          };
        };
      };
    };
  };
};

interface DataLayerEvent {
  event: string;
  topic_title?: string;
  topic_link?: string;
}

const RelatedTopics = ({ fields }: RelatedTopicsProps): JSX.Element => {
  const sortedTopicList = fields?.data?.item?.relatedTopics?.targetItems?.sort((a, b) =>
    a?.title?.value?.localeCompare(b.title.value)
  );
  const { t } = useI18n();

  const hasValues = sortedTopicList && sortedTopicList.length > 0;
  if (!hasValues) {
    return <></>;
  }
  const handleTopicsClick = (title: string, url: string) => {
    const eventData: DataLayerEvent = {
      event: 'related_topics_click',
      topic_title: title,
      topic_link: url,
    };
    window.dataLayer.push(eventData);
  };
  return (
    <div className="related-topic" data-testid="related-topics">
      <div className="w-full max-w-[1200px] 2xl:max-w-[1440px] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto py-[80px]">
        <div className=" text-aubergine pb-[40px] font-gowlingBliss text-[32px] md:text-[48px] font-bold leading-normal md:leading-[155%] tracking-[-0.64px] md:tracking-[-0.48px]">
          {t('ArticleRelatedTopics')}
        </div>

        <div className="flex flex-col md:flex-wrap print:flex print:flex-row gap-y-[20px] md:flex-row">
          {sortedTopicList?.map((item: targetItemsType, index: number) => (
            <a
              onClick={() => handleTopicsClick(item?.title?.value, item?.url?.path)}
              key={index}
              href={fields?.data?.datasource?.SeeMore?.jsonValue?.value?.href
                .concat(fields?.data?.datasource?.SeeMore?.jsonValue?.value?.querystring)
                .slice(0, 30)
                .concat(item?.title?.value)}
              className={`font-arial text-base font-bold leading-normal text-black md:hover:text-purple  transition-all ease-in-out delay-50 px-[20px] py-1 border-l border-[#231F20] flex items-center h-[40px] md:hover:border-l-purple cursor-pointer  `}
            >
              {item?.title?.value}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedTopics;
