import NoItemsIcon from 'core/atoms/Icons/NoItemsIcon';
import { useI18n } from 'next-localization';

interface NoItemsFoundProps {
  keyword: string;
}

const NoItemsFound = ({ keyword }: NoItemsFoundProps) => {
  const { t } = useI18n();
  return (
    <div className="col-span-12 lg:col-span-9 flex flex-col justify-center items-center text-center text-trueBlack text-[32px] tracking-[-0.64px] w-full font-gowlingBliss mt-[80px] mb-[74px]">
      <NoItemsIcon />
      <div className="w-full mt-[27px]">{t('NoResults', { keyword })}</div>
    </div>
  );
};

export default NoItemsFound;
