import {
  Image as SitecoreImage,
  ImageField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import NextImage from 'next/image';
import { ReactElement } from 'react';
import { ImageItem } from 'src/global';

type ImageType = ImageField & {
  value?: ImageItem;
};

type ImageProps = {
  field: ImageField;
  className?: string;
  priority?: boolean;
  editable?: boolean;
};

const DEFAULT_SIZE = 60;

const Image = ({ field, className, priority, editable }: ImageProps): ReactElement => {
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext.pageEditing;

  const { value = {} } = field || ({} as ImageType);
  const { src, alt = '', width, height } = value as ImageItem;

  if (isEditing) {
    return <SitecoreImage field={field} className={className} editable={editable} />;
  }

  if (src) {
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width || DEFAULT_SIZE}
        height={height || DEFAULT_SIZE}
        className={className}
        priority={priority}
      />
    );
  }

  return <></>;
};

export default Image;
