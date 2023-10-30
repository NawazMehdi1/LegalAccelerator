import React from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const RichText = (props: RichTextProps): JSX.Element => {
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
      <div className="component-content font-sans text-11 mt-9  md:mt-4.5 leading-5 w-full">
        {text}
      </div>
    </div>
  );
};

export default RichText;
