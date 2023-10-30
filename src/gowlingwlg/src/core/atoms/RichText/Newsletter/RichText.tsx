import React from 'react';
import { RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { RichTextProps } from '../RichText.types';

export const Newsletter = (props: RichTextProps): JSX.Element => {
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
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
      className={`component rich-text ${classStyle} ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content text-aubergine font-arial font-normal text-base leading-6 md:mb-0">
        {text}
      </div>
    </div>
  );
};
