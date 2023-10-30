import Image from 'core/atoms/Image';
import { MapProps } from './map.types';

const BaiduMaps = ({ markers }: MapProps) => {
  const imageField = {
    value: markers?.[0]?.alternateImage,
  };

  return (
    <div className="relative overflow-hidden h-full w-full">
      <Image className="object-cover w-full" field={imageField} priority={true} />
    </div>
  );
};

export default BaiduMaps;
