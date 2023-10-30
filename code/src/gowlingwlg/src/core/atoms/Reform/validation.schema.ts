import { EMAIL } from 'constants/regex';
import { object, string } from 'yup';

const text = string();
const email = string().matches(EMAIL, 'Email is not valid');

export const getValidationSchema = (fields: { type: string; name: string }[]) => {
  const inputFields = fields.reduce((acc, item) => {
    if (item.type === 'email') {
      return {
        ...acc,
        [item.name]: email,
      };
    }

    if (item.type === 'text') {
      return {
        ...acc,
        [item.name]: text,
      };
    }

    return acc;
  }, {});
  return object(inputFields);
};
