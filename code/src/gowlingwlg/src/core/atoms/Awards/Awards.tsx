import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { Awards } from 'components/BioAccordion/BioAccordion';
import { newFormatDate } from 'core/utils/formatDate';

interface AwardsProps {
  Awards: Awards;
}

const AwardsComponent = ({ Awards }: AwardsProps) => {
  return (
    <div key={Awards?.id} className="w-full mb-[35px]">
      <div className="flex items-center mb-[14px] max-w-[90%] w-full">
        <p className="link font-bold" style={{ color: '#761847' }}>
          {newFormatDate(Awards?.published_date, 'en-US')}
        </p>
      </div>
      <Text
        field={{
          value: Awards?.name,
        }}
        tag="p"
        className="text-trueBlack font-arial text-[24px] font-normal leading-normal w-full"
      />
    </div>
  );
};

export default AwardsComponent;
