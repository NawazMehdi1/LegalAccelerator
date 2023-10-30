import { render } from '@testing-library/react';
import { ComponentProps } from 'lib/component-props';
import { TeaserProps } from 'components/TeasersList/Teasers.types';
import ImageOnRight from 'components/TeasersList/ImageOnRight';
import ImageOnLeft from 'components/TeasersList/ImageOnLeft';

jest.mock('core/atoms/Image');

const componentProps: ComponentProps = {
  rendering: {
    componentName: 'TeasersList',
    dataSource: 'sitecore/Content/TeasersList',
    placeholders: {},
  },
  params: {},
};

const TeasersProps: TeaserProps = {
  ...componentProps,
  fields: {
    SelectedTeasers: [
      {
        id: 'id',
        fields: {
          Title: {
            value: 'Title',
          },
          Description: {
            value: 'Description',
          },
          CTA: {
            value: {
              anchor: '',
              href: '',
              linkType: '',
              target: '',
              text: '',
            },
          },
          Image: {
            value: {
              src: '',
              alt: '',
            },
          },
        },
      },
    ],
  },
};

describe('Teasers', () => {
  it('should render ImageOnRight correctly', () => {
    const rendered = render(<ImageOnRight {...TeasersProps} />);
    expect(rendered.getByTestId('image-on-right')).toBeTruthy();
  });

  it('should render ImageOnLeft correctly', () => {
    const rendered = render(<ImageOnLeft {...TeasersProps} />);
    expect(rendered.getByTestId('image-on-left')).toBeTruthy();
  });
});
