import React from 'react';
import { ItemProps } from './reform.types';
import { mapPropsToReactProps } from './utils';

const TextArea = React.forwardRef<HTMLTextAreaElement, ItemProps>(
  ({ staticProps, dynamicProps }, ref) => {
    const { name, ...props } = mapPropsToReactProps(staticProps) as { name: string };
    const nameParts = name.split('[');
    const errorMessage =
      dynamicProps.formState.errors[nameParts[0]]?.[nameParts[1].replace(']', '')]?.message;
    return (
      <>
        <textarea ref={ref} {...props} {...dynamicProps.register(name)} />
        {errorMessage && <p className="text-red mt-2">{errorMessage}</p>}
      </>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
