import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import PlayIcon from 'core/atoms/Icons/PlayIcon';
import { SliderCardsType } from './VideoTile.types';
import Link from 'next/link';

const VideoTiles = (props: SliderCardsType): JSX.Element => {
  return (
    <Link href={props?.TileCTA?.jsonValue?.value?.href || '#'}>
      <div className="bg-extraLightGrey px-5 py-[30px] min-h-full pb-32 relative hover:shadow-custom">
        <Text field={props.parent.parent.title} tag="h5" className="subtitle-bold leading-7" />
        <div className="absolute bottom-[30px]">
          <div className="flex items-center">
            <PlayIcon height={35} width={35} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoTiles;
