import { TextField } from '@sitecore-jss/sitecore-jss-nextjs';

export const getAdddress = (address: {
  City: TextField;
  ['Building Name']: TextField;
  ['Address 1']: TextField;
  ['Address 2']: TextField;
  ['Address 3']: TextField;
  Country: TextField;
  ['Postal Code']: TextField;
  State: TextField;
}) => {
  return [
    'Building Name',
    'Address 1',
    'Address 2',
    'Address 3',
    'City',
    'State',
    'Postal Code',
    'Country',
  ]
    .reduce((acc, k) => {
      const value = address[k as keyof typeof address]?.value;
      if ((value as string)?.length) {
        return [...acc, value];
      }
      return acc;
    }, [])
    .join(', ');
};
