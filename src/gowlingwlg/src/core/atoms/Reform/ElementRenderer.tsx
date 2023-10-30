import { HTMLElement, TextNode } from 'node-html-parser';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import React from 'react';
import GenericTag from './GenericTag';
import { cleanString, getAllFields, transformStringToObject } from './utils';
import TextArea from './TextArea';
import Input from './Input';
import Form from './Form';

const FormTags = {
  input: Input,
  textarea: TextArea,
};

type TextNodeType = {
  _rawText: string;
};

type TagType = HTMLElement | TextNode;

const ElementRenderer = ({
  tag,
  methods,
  confirmationModal,
  emailTemplates,
  path = '',
}: {
  tag: TagType;
  confirmationModal?: string;
  methods?: UseFormReturn<FieldValues>;
  path?: string;
  emailTemplates: {
    EmailTemplate: string;
    SenderEmail: string;
    TemplateId: string;
    IsInternal: boolean;
  }[];
}): JSX.Element => {
  if (tag instanceof HTMLElement && tag.rawTagName) {
    const InputElement = FormTags[tag.rawTagName as keyof typeof FormTags];
    const emailNotifications = emailTemplates
      .map((item) => `${item.TemplateId}=[${item.IsInternal || false}]${item.SenderEmail}`)
      .join(';');
    const props = transformStringToObject(tag.rawAttrs);

    if (tag.rawTagName === 'form') {
      const inputFields = getAllFields(tag);
      return (
        <Form
          inputFields={inputFields}
          confirmationModal={confirmationModal}
          emailNotifications={emailNotifications}
          {...props}
        >
          {(_methods) =>
            tag.childNodes.map((node, index) => (
              <ElementRenderer
                key={`fe_${index}`}
                tag={node as HTMLElement}
                methods={_methods}
                emailTemplates={emailTemplates}
                path={path}
              />
            ))
          }
        </Form>
      );
    }

    if (InputElement) {
      return <InputElement staticProps={props} dynamicProps={methods} />;
    }

    if (tag.rawTagName === 'label') {
    }

    return (
      <GenericTag tag={tag.rawTagName} props={props}>
        <>
          {tag.childNodes.map((node, index) => (
            <ElementRenderer
              key={`gte_${index}`}
              confirmationModal={confirmationModal}
              tag={node as HTMLElement}
              methods={methods}
              emailTemplates={emailTemplates}
              path={path}
            />
          ))}
        </>
      </GenericTag>
    );
  }

  if (tag instanceof TextNode) {
    return <>{cleanString((tag as unknown as TextNodeType)._rawText)}</>;
  }

  return (
    <>
      {tag.childNodes.map((node, index) => (
        <ElementRenderer
          key={`ere_${index}`}
          tag={node as HTMLElement}
          confirmationModal={confirmationModal}
          methods={methods}
          emailTemplates={emailTemplates}
          path={path}
        />
      ))}
    </>
  );
};

export default ElementRenderer;
