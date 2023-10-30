import { HTMLElement } from 'node-html-parser';
import { GenericProps } from './reform.types';

export const transformStringToObject = (
  input: string
): Record<string, string | number | boolean> => {
  const attributes = input.match(/([\w-])+="[^"]*"/g);
  const booleanAttributes = input
    .replace(/([\w-])+="[^"]*"/g, '')
    .trim()
    .split(' ');

  if (!attributes) {
    return {};
  }

  const result: Record<string, string | number | boolean> = {};

  attributes.forEach((attribute) => {
    const [key, value] = attribute.split('=');
    const val = value.replace(/"/g, '');
    const parsedValue = val === 'false' ? false : val;
    result[key] = parsedValue;
  });

  booleanAttributes.forEach((attribute) => {
    result[attribute.replace(/\n/g, '')] = true;
  });

  return result;
};

const ReactPropMap = {
  for: 'htmlFor',
  class: 'className',
};

export const mapPropsToReactProps = (props: GenericProps) => {
  return Object.keys(props).reduce((acc, k) => {
    const reactPropKey = ReactPropMap[k as keyof typeof ReactPropMap];

    if (reactPropKey) {
      return {
        ...acc,
        [reactPropKey]: props[k],
      };
    }

    return {
      ...acc,
      [k]: props[k],
    };
  }, {});
};

export const cleanString = (input: string) => {
  // Remove whitespace characters such as spaces, tabs, carriage returns, and line feeds
  const cleanedString = input.replace(/[\s\r\n]+/g, ' ').replace(/ +/g, ' ');

  // Check if the cleaned string is empty or consists only of whitespace
  if (cleanedString.trim() === '') {
    return null;
  }

  return cleanedString;
};

export const cleanHtmlMarkup = (input: string) =>
  input
    .replace(/[\s\r\n]+/g, ' ')
    .trim()
    .replace(/> </g, '><');

type FieldItem = {
  type: string;
  name: string;
};

export const getAllFields = (tag: HTMLElement): FieldItem[] => {
  return tag.childNodes?.reduce((acc, item: HTMLElement) => {
    if (item.rawTagName === 'input') {
      const { type, name } = transformStringToObject(item.rawAttrs);
      return [
        ...acc,
        {
          type: type as string,
          name: name as string,
        },
      ];
    }

    return [...acc, ...getAllFields(item)];
  }, [] as FieldItem[]);
};
