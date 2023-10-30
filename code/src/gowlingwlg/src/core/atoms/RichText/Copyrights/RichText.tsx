import React from 'react';
import { RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { RichTextProps } from '../RichText.types';

export const Copyrights = (props: RichTextProps): JSX.Element => {
  const currentYear = new Date().getFullYear();
  const updatedText = {
    ...props.fields.Text,
    value: props.fields.Text.value.replace(/{{fullyear}}/g, currentYear.toString()),
  };

  const text = props.fields ? (
    <JssRichText field={updatedText} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  const id = props.params.RenderingIdentifier;
  let classStyle;
  if (props.params.class != undefined) {
    classStyle = props.params.class;
  } else {
    classStyle = '';
  }
  return (
    <div
      className={`component rich-text w-full ${classStyle} ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content text-black font-arial font-normal text-base leading-[156%] mt-[30px] md:mt-0 w-full max-w-[1200px] 2xl:max-w-[1440px] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto w-[auto]">
        {text}
      </div>
    </div>
  );
};
