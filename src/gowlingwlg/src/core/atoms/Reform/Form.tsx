import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mapPropsToReactProps } from './utils';
import { Dialog, DialogContent } from 'core/atoms/ui/dialog';
import { GenericProps } from './reform.types';
import { getValidationSchema } from './validation.schema';
import { useEffect, useRef, useState } from 'react';

type FormProps<TFormValues extends FieldValues> = {
  children: (methods: UseFormReturn<TFormValues>) => JSX.Element[];
  confirmationModal?: string;
  emailNotifications: string;
  inputFields: {
    type: string;
    name: string;
  }[];
};

const Form = ({
  children,
  inputFields,
  confirmationModal,
  emailNotifications,
  ...props
}: FormProps<GenericProps>) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const validationSchema = getValidationSchema(inputFields);
  const methods = useForm<FieldValues>({ resolver: yupResolver(validationSchema) });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (modalOpen) {
      document.getElementsByTagName('html')[0].classList.add('overflow-hidden');
    } else {
      document.getElementsByTagName('html')[0].classList.remove('overflow-hidden');
    }
  }, [modalOpen]);

  const onSubmit = async (data: FieldValues) => {
    const { action } = mapPropsToReactProps(props) as {
      action: string;
    };

    const formData = new FormData();
    Object.entries(data).forEach(([k1, v1]) => {
      Object.entries(v1).forEach(([k2, v2]) => {
        formData.append(`${k1}[${k2}]`, v2 as string);
      });
    });

    const inputs = [...(formRef?.current?.querySelectorAll('[data-id]') || [])] as unknown as {
      id: string;
      dataset: { id: string };
    }[];
    const hash: string[] = [Buffer.from(emailNotifications).toString('base64')];
    let hashContainer = '';

    inputs.forEach((item) => {
      if (item.dataset.id !== 'hash') {
        hash.push(Buffer.from(`${item.dataset.id}.${item.id}`).toString('base64'));
      } else {
        hashContainer = `answers[${item.id}]`;
      }
    });

    formData.set(hashContainer, hash.join(';'));

    try {
      await fetch('/api/form-submission', {
        method: 'POST',
        headers: {
          'x-action-url': action,
          Accept: 'application/json',
        },
        body: formData,
      });
      setModalOpen(true);
    } catch {}
  };

  return (
    <>
      <form onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
        {children(methods)}
      </form>
      {confirmationModal && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="md:pl-11">
            <div dangerouslySetInnerHTML={{ __html: confirmationModal }} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Form;
