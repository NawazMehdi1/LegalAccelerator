import React from 'react';
import { ItemProps } from './reform.types';
import { mapPropsToReactProps } from './utils';

const Input = React.forwardRef<HTMLInputElement, ItemProps>(
  ({ staticProps, dynamicProps }, ref) => {
    const { name, ...props } = mapPropsToReactProps(staticProps) as { name: string };
    const nameParts = name.split('[');
    const errorMessage =
      dynamicProps.formState.errors[nameParts[0]]?.[nameParts[1].replace(']', '')]?.message;
    return (
      <>
        <input
          ref={ref}
          type={(staticProps?.type as string) || 'text'}
          {...props}
          {...dynamicProps.register(name)}
        />
        {errorMessage && <p className="text-red mt-2">{errorMessage}</p>}
      </>
    );
  }
);

Input.displayName = 'Input';

export default Input;
