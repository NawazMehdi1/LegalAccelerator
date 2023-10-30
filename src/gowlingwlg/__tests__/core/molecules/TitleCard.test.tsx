import TitleCard from 'core/molecules/TitleCard/TitleCard';
import TitleCardWithSideImage from 'core/molecules/TitleCard/TitleCardWithSideImage';
import { TitleCardProps } from 'core/molecules/TitleCard/types';
import { render } from '@testing-library/react';

const titleCardProps: TitleCardProps = {
  fields: {
    data: {
      item: {
        subTitle: {
          jsonValue: { value: 'subTitle' },
        },
        pageType: {
          targetItem: {
            pageType: { value: 'pageType' },
            icon: {
              jsonValue: {
                value: {
                  src: '/src',
                  alt: 'alt',
                },
              },
            },
          },
        },
        publishedDate: {
          jsonValue: { value: '2021-01-01' },
        },
        readTime: {
          jsonValue: { value: 'readTime' },
        },
        title: {
          jsonValue: { value: 'title' },
        },
        image: {
          jsonValue: {
            value: {
              src: '/src',
              alt: 'alt',
            },
          },
        },
        backgroundImage: {
          jsonValue: {
            value: {
              src: '/src',
              alt: 'alt',
            },
          },
        },
        publishedDateOverrideText: {
          jsonValue: { value: 'publishedDateOverrideText' },
        },
        ShowReadTime: {
          jsonValue: {
            value: false,
          },
        },
      },
      icons: {
        children: {
          results: [
            {
              name: 'icon',
              image: {
                jsonValue: {
                  value: {
                    src: '/src',
                    alt: 'alt',
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
  params: {
    Styles: 'Styles',
  },
  rendering: {
    uid: 'uid',
    componentName: 'componentName',
  },
};

describe('TitleCard', () => {
  it('should render TitleCard component', () => {
    const rendered = render(<TitleCard {...titleCardProps} />);
    expect(rendered.getByTestId('title-card')).toBeTruthy();
  });

  it('should render TitleCard component', () => {
    const rendered = render(<TitleCardWithSideImage {...titleCardProps} />);
    expect(rendered.getByTestId('title-card-with-side-image')).toBeTruthy();
  });
});
