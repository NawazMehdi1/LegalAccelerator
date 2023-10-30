import { useMemo } from 'react';
import {
  useSitecoreContext,
  RichText as JssRichText,
  withDatasourceCheck,
  Text,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';

import { ContentCardsProps, ContentCardsType } from '../contentCard.types';

const ContentCards = ({ fields }: ContentCardsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const contentCards = useMemo(() => {
    const allContentCards = fields?.data?.datasource?.featuredContentCards?.targetItems || [];
    return allContentCards.slice(0, 3);
  }, [fields?.data?.datasource?.featuredContentCards?.targetItems]);
  const { t } = useI18n();
  return (
    <>
      {(contentCards || isEditing) && (
        <div className="grid">
          <div
            className={`md:grid-cols-1 md:grid gap-4 mt-0 md:mt-[0.875rem] max-w-[75rem] 2xl:max-w-[90rem] mx-auto`}
          >
            {contentCards.map((card: ContentCardsType) => (
              <div
                key={card.id}
                className="md:w-full md:hover:shadow-custom hover:h-fit md:p-[0.313rem]"
              >
                <a href={card?.url?.url}>
                  <div className="">
                    <RichText
                      field={fields?.data?.datasource?.title}
                      className="md:text-black text-white font-bold leading-normal md:mb-[2.063rem] mb-[0.625rem]"
                    />
                    <Text
                      tag="h3"
                      field={card?.title}
                      className="font-bold md:w-full w-[16.313rem] font-arial leading-normal md:text-black text-white md:text-[1.5rem] text-[1rem] md:mb-[0.75rem] mb-[0.875rem]"
                    />
                    <JssRichText
                      field={card?.content}
                      className="md:text-darkGrey text-white leading-[156%] md:mb-[0.75rem] mb-[0.875rem]"
                    />
                    <a
                      href={card?.url?.url}
                      className="h-full block md:text-mainPurple text-white leading-normal font-bold"
                    >
                      <span>{t('ReadMore')}</span>
                    </a>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <style jsx>{`
            .grid-cols-1 {
              grid-template-columns: 1fr;
              display: grid;
              grid-gap: 1rem;
            }
            .grid-cols-2 {
              grid-template-columns: repeat(2, 1fr);
              display: grid;
              grid-gap: 1rem;
            }
            .grid-cols-3 {
              grid-template-columns: repeat(3, 1fr);
              display: grid;
              grid-gap: 1rem;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default withDatasourceCheck()<ContentCardsProps>(ContentCards);
