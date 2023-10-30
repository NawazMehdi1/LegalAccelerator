import { GenericProps } from './reform.types';
import { mapPropsToReactProps } from './utils';

type GenericTagProps = {
  tag: string;
  props?: GenericProps;
  children?: React.ReactNode | string;
};

const TagsStyleMap = {
  h1: '',
  h2: '',
  h3: '',
  h4: '',
  h5: '',
  h6: '',
  p: '',
  span: '',
  label: '',
};

const GenericTag = ({ tag, props, children }: GenericTagProps) => {
  const className = TagsStyleMap[tag as keyof typeof TagsStyleMap];
  const Component = tag as React.ElementType;

  return (
    <Component className={className} {...mapPropsToReactProps(props as GenericProps)}>
      {children}
    </Component>
  );
};

export default GenericTag;
