import React, { useState, useEffect } from 'react';
import {
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
interface Fields {
  Image: ImageField;
  ScrollImage: ImageField;
  ImageCaption: Field<string>;
  TargetUrl: LinkField;
}

type ImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImageDefault = (props: ImageProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

export const Banner = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const backgroundStyle = { backgroundImage: `url('${props?.fields?.Image?.value?.src}')` };
  const modifyImageProps = {
    ...props.fields.Image,
    editable: props?.fields?.Image?.editable
      ?.replace(`width="${props?.fields?.Image?.value?.width}"`, 'width="100%"')
      .replace(`height="${props?.fields?.Image?.value?.height}"`, 'height="100%"'),
  };
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component hero-banner ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content sc-sxa-image-hero-banner" style={backgroundStyle}>
        {sitecoreContext.pageEditing ? <Image field={modifyImageProps} /> : ''}
      </div>
    </div>
  );
};

export const Default = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Check if the page was refreshed
    const pageRefreshed = localStorage.getItem('pageRefreshed') === 'true';

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Run the handleScroll function immediately if the page was refreshed
    if (pageRefreshed) {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll);

    // Set a flag in localStorage to indicate that the page has been refreshed
    localStorage.setItem('pageRefreshed', 'true');

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isNeedScrolling =
    sitecoreContext.route?.name == 'Home' && props?.fields?.ScrollImage?.value?.asset != null;

  const isHeader = props?.fields?.ScrollImage?.value?.asset != null;
  if (props.fields) {
    const id = props?.params?.RenderingIdentifier;
    return (
      <div className={`component image ${props?.params?.styles}`} id={id ? id : undefined}>
        {sitecoreContext.pageState === 'edit' ? (
          <Image field={props?.fields?.Image} />
        ) : (
          <JssLink field={props?.fields?.TargetUrl}>
            {isHeader ? (
              <>
                <Image
                  className={`transition-all h-[1.625ren] md:h-[3.125rem] ${
                    isNeedScrolling
                      ? `${scrolling ? 'opacity-100' : 'opacity-0 hidden'}`
                      : 'opacity-100 '
                  }`}
                  field={props?.fields?.ScrollImage}
                />
                <Image
                  className={`transition-all h-[1.625rem] md:h-[3.125rem] ${
                    isNeedScrolling
                      ? `${!scrolling ? 'opacity-100' : 'opacity-0 hidden'}`
                      : 'opacity-0 hidden '
                  }`}
                  field={props?.fields?.Image}
                />
              </>
            ) : (
              <Image
                field={props?.fields?.Image}
                className="w-[15.813rem] h-[2.875rem] md:w-[12.063rem] md:h-[2.193rem]"
              />
            )}
          </JssLink>
        )}
      </div>
    );
  }

  return <ImageDefault {...props} />;
};
