import { useI18n } from 'next-localization';
import { useState, useEffect, useRef } from 'react';
import TeaserArrowLeftIcon from 'core/atoms/Icons/TeaserArrowLeftIcon';

type TopicPropsType = {
  setActiveTopics: (value: string[]) => void;
  activeTopics: string[];
  topicsList: Topic[];
};

type Topic = {
  text: string;
  id: string;
  count?: number;
};

const TopicsSorting = ({ setActiveTopics, activeTopics, topicsList }: TopicPropsType) => {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [seeAll, setseeAll] = useState(false);
  const [height, setHeight] = useState(0);
  const [shouldFetchSearchItems, setShouldFetchSearchItems] = useState<boolean>(true);

  const activeTopicsArry = [...activeTopics];

  useEffect(() => {
    if (shouldFetchSearchItems) {
      setShouldFetchSearchItems(false);
    }
  }, [shouldFetchSearchItems]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setHeight(ref?.current?.clientHeight || 0);
  });

  const removeElementFromActiveTopics = (element: string) => {
    const filteredArry = activeTopicsArry.filter((item) => item !== element);
    setActiveTopics(filteredArry);
  };

  const addItemToActiveTopics = (element: string) => {
    activeTopicsArry.push(element);
    setActiveTopics(activeTopicsArry);
  };

  if (topicsList?.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap gap-[1.25rem]">
      <h4 className="w-full text-mainPurple capitalize flex justify-between text-sm tracking-[0.035rem] font-arial">
        {t('CategoryFilterTitle')}
      </h4>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`${
          seeAll ? '' : 'max-h-[175px]'
        }  overflow-hidden flex flex-wrap gap-x-[10px] gap-y-[20px]`}
      >
        {topicsList &&
          topicsList.map((item, index) => {
            const isActive = activeTopics.includes(item.text);
            return (
              <button
                onClick={() => {
                  isActive
                    ? removeElementFromActiveTopics(item.text)
                    : addItemToActiveTopics(item.text);
                }}
                key={`topic-${index}`}
                className={`${
                  isActive
                    ? 'bg-purple text-white hover:text-shadow-whiteSmall'
                    : 'bg-white text-aubergine hover:text-shadow-blackSmall'
                } border border-solid border-trueBlack rounded-xxl py-[14px] px-[28px] small-text`}
              >
                {item.text}
              </button>
            );
          })}
      </div>
      {height > 176 && (
        <button
          className="text-mainPurple font-bold flex items-center"
          onClick={() => setseeAll(!seeAll)}
        >
          {seeAll ? 'See Less' : t('SeeAll')}
          <TeaserArrowLeftIcon fill="#74519A" height={9} width={18} />
        </button>
      )}
    </div>
  );
};

export default TopicsSorting;
