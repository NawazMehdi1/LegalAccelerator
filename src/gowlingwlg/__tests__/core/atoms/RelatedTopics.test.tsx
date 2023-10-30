import RelatedTopics, { RelatedTopicsProps } from 'components/RelatedTopics/RelatedTopics';
import { render } from '@testing-library/react';
import { ComponentProps } from 'lib/component-props';

const componentProps: ComponentProps = {
  rendering: {
    componentName: 'LinkList',
    dataSource: 'sitecore/Content/LinkList',
    placeholders: {},
  },
  params: {},
};

const relatedTopicsProps: RelatedTopicsProps = {
  ...componentProps,
  fields: {
    data: {
      item: {
        relatedTopics: {
          targetItems: [
            {
              title: {
                value: 'title',
              },
              url: {
                path: 'url',
              },
            },
          ],
        },
      },
      datasource: {
        SeeMore: undefined,
      },
    },
  },
};

describe('RelatedTopics', () => {
  it('should render RelatedTopics component', () => {
    const rendered = render(<RelatedTopics {...relatedTopicsProps} />);
    expect(rendered.getByTestId('related-topics')).toBeTruthy();
  });
});
