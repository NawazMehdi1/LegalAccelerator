/* eslint-disable @typescript-eslint/ban-ts-comment */
import ProfileDetail from 'components/ProfileDetail/ProfileDetail';
import { render } from '@testing-library/react';
import { ComponentProps } from 'lib/component-props';
import { ProfileDetailProps } from 'components/ProfileDetail/profileDetails.types';

jest.mock('vcf', () => ({
  default: jest.fn(),
}));

const componentProps: ComponentProps = {
  rendering: {
    componentName: 'LinkList',
    dataSource: 'sitecore/Content/LinkList',
    placeholders: {},
  },
  params: {},
};

const profileProps: ProfileDetailProps = {
  ...componentProps,
  fields: {
    data: {
      item: {
        alternateTitle: {
          jsonValue: {
            value: 'alternateTitle',
          },
        },
        professionalTitle: {
          jsonValue: {
            fields: {
              Title: { value: 'Title' },
            },
          },
        },
        profileImage: {
          jsonValue: {
            value: undefined,
          },
        },
      },
      icons: {
        children: {
          results: [],
        },
      },
    },
  },
};

describe('ProfileDetail', () => {
  it('renders a ProfileDetail', () => {
    const rendered = render(<ProfileDetail {...profileProps} />);

    expect(rendered.getByTestId('profile-detail')).toBeTruthy();
  });
});
