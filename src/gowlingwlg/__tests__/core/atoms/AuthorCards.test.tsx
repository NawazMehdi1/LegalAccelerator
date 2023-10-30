import { render } from '@testing-library/react';
import { AuthorProps } from 'core/atoms/Authors/types';
import AuthorCards from 'core/atoms/Authors/AuthorCards';

jest.mock('core/molecules/PersonCard/PersonCard');

describe('AuthorCards', () => {
  it('renders a AuthorCards', () => {
    const authorProps: AuthorProps = {
      fields: {
        data: {
          item: {
            KeyContacts: {
              targetItems: [
                {
                  alternateTitle: {
                    value: 'title',
                    jsonValue: undefined,
                  },
                  title: {
                    value: 'title',
                    jsonValue: undefined,
                  },
                  AdditionalOffices: {
                    value: 'title',
                    jsonValue: undefined,
                  },
                  linkedIn: {
                    jsonValue: {
                      value: {
                        anchor: '',
                        href: '',
                        linkType: '',
                        target: '',
                      },
                    },
                  },
                  profileImage: {
                    jsonValue: {
                      value: {
                        alt: '',
                        src: '',
                        height: NaN,
                        width: NaN,
                      },
                    },
                  },
                  professionalTitle: {
                    targetItem: {
                      title: {
                        value: 'title',
                        jsonValue: undefined,
                      },
                    },
                  },
                  offices: {
                    targetItems: [
                      {
                        title: {
                          value: 'title',
                          jsonValue: undefined,
                        },
                      },
                    ],
                  },
                  role: {
                    value: 'title',
                  },
                  url: {
                    path: 'path',
                  },
                },
              ],
            },
          },
        },
      },
      params: {
        FieldNames: 'FourAuthorCardsInOneRow',
        OverrideTitle: '',
        CarouselConversionLimit: 0,
      },
    };

    const rendered = render(<AuthorCards {...authorProps} />);

    expect(rendered.getByTestId('author-card')).toBeInTheDocument();
  });
});
