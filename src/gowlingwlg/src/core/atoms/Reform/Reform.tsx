import { parse } from 'node-html-parser';
import React, { memo } from 'react';
import { cleanHtmlMarkup } from './utils';
import ElementRenderer from './ElementRenderer';

type ReformProps = {
  formTemplate: string;
  emailTemplates: {
    EmailTemplate: string;
    SenderEmail: string;
    TemplateId: string;
    IsInternal: boolean;
  }[];
  confirmationModal: string;
};

const Reform = memo((props: ReformProps) => {
  const form = parse(cleanHtmlMarkup(props.formTemplate));
  return (
    <ElementRenderer
      tag={form}
      confirmationModal={props.confirmationModal}
      emailTemplates={props.emailTemplates}
    />
  );
});

Reform.displayName = 'Reform';

export default Reform;
