import { useI18n } from 'next-localization';

type sortProps = {
  sortDirection?: string;
  setSortDirection: (direction: string) => void;
  heading: string;
  category: string;
};

const Sorting = ({ sortDirection, setSortDirection, heading, category }: sortProps) => {
  const { t } = useI18n();

  if (!['People', 'News', 'Insights'].includes(category)) {
    return <></>;
  }

  return (
    <div className="flex flex-wrap gap-y-[17px] gap-x-[43px]">
      <div className="w-full flex justify-between">
        <h4 className="text-mainPurple text-sm font-arial tracking-[0.56px]">{heading}</h4>
      </div>
      <button
        onClick={() => {
          setSortDirection('asc');
        }}
        className={`
          ${
            sortDirection == 'asc'
              ? ` border-b-[2px] border-black border-solid text-shadow-black mb-[-2px] text-black`
              : 'hover:text-shadow-black text-black'
          } 
        `}
      >
        {t('Ascending')}
      </button>
      <button
        onClick={() => {
          setSortDirection('desc');
        }}
        className={`
          ${
            sortDirection == 'desc'
              ? ` border-b-[2px] border-black border-solid text-shadow-black  mb-[-2px]`
              : 'hover:text-shadow-black'
          } `}
      >
        {t('Descending')}
      </button>
    </div>
  );
};

export default Sorting;
