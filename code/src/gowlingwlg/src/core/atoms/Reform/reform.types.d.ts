export type GenericProps = {
  [key: string]: string | boolean | number | React.ReactNode;
};

export type ItemProps = {
  staticProps: GenericProps;
  dynamicProps: InputHTMLAttributes<HTMLInputElement>;
};

export type TextNodeType = {
  _rawText: string;
};

export type TagType = HTMLElement | TextNode;
