jest.mock('next/dynamic');
jest.mock('next/link');
jest.mock('next/head');
jest.mock('next/image');
jest.mock('next-localization', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  useI18n: () => {
    return {
      t: (str) => str,
      i18n: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    init: () => {},
  },
}));
jest.mock('@sitecore-jss/sitecore-jss-nextjs', () => ({
  Placeholder: jest.fn(),
  TextField: jest.fn(),
  Field: jest.fn(),
  RichText: jest.fn(),
  LinkField: jest.fn(),
  DateField: jest.fn(),
  Text: jest.fn(),
  Link: jest.fn(),
  Image: jest.fn(),
  ImageField: jest.fn(),
  useSitecoreContext: () => ({
    sitecoreContext: {
      pageState: 'normal',
      language: 'en',
    },
  }),
  withDatasourceCheck: () => (component) => component,
}));
