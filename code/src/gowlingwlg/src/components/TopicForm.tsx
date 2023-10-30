import { Field, Item } from '@sitecore-jss/sitecore-jss-nextjs';
import Reform from 'core/atoms/Reform';
import ObjectHash from 'object-hash';
import { useMemo } from 'react';

type EmailTemplate = Item & {
  fields: {
    'Email Template': Field<string>;
    'Sender Email': Field<string>;
    'Template Id': Field<string>;
    'Is Internal': Field<boolean>;
  };
};

type TopicFormProps = {
  fields: {
    'Email Template': EmailTemplate[];
    Html: Field<string>;
    Message: Field<string>;
  };
};

const TopicForm = (props: TopicFormProps): JSX.Element => {
  const oh = ObjectHash(props);
  const { formTemplate, emailTemplates, confirmationModal } = useMemo(
    () => ({
      formTemplate: props?.fields?.Html?.value,
      emailTemplates: props?.fields?.['Email Template']?.map((item) => ({
        EmailTemplate: item?.fields?.['Email Template']?.value,
        SenderEmail: item?.fields?.['Sender Email']?.value,
        TemplateId: item?.fields?.['Template Id']?.value,
        IsInternal: item?.fields?.['Is Internal']?.value,
      })),
      confirmationModal: props?.fields?.Message?.value,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [oh]
  );

  return (
    <Reform
      formTemplate={formTemplate}
      emailTemplates={emailTemplates}
      confirmationModal={confirmationModal}
    />
  );
};

export default TopicForm;
