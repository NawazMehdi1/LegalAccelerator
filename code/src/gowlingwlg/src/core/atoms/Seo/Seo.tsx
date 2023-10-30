import { NextSeo } from 'next-seo';
import { SeoProps } from './seo.types';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const Seo = ({ OpenGraphTitle, OpenGraphDescription, OpenGraphImageUrl, Title }: SeoProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  if (isEditing) return <></>;
  return (
    <NextSeo
      openGraph={{
        title: OpenGraphTitle?.value || Title?.value,
        description: OpenGraphDescription?.value,
        ...(OpenGraphImageUrl?.value?.src && {
          images: [{ url: OpenGraphImageUrl?.value?.src }],
        }),
        url:
          (process.env.NEXT_PUBLIC_URL || 'localhost:3000') +
          (sitecoreContext?.itemPath as string).toLowerCase(),
      }}
    />
  );
};

export default Seo;
