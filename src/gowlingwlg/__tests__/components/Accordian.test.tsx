import Accordian from 'components/Accordian/Accordian';
import { render } from '@testing-library/react';
import { AccordianProps } from 'components/Accordian/Accordian';
import mockRouter from 'next-router-mock';
import { ComponentProps } from 'lib/component-props';

const componentProps: ComponentProps = {
  rendering: {
    componentName: 'LinkList',
    dataSource: 'sitecore/Content/LinkList',
    placeholders: {},
  },
  params: {},
};

const AccordianProps: AccordianProps = {
  ...componentProps,
  fields: {
    Title: {
      value: 'Title',
    },
    Description: {
      value: 'Description',
    },
    AccordianList: [
      {
        displayName: {
          value: 'displayName',
        },
        fields: {
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
              height: '',
              width: '',
            },
          },
          Title: {
            value: 'Title',
          },
          TitleLink: {
            value: {},
          },
        },
        id: 'id',
        name: {
          value: 'name',
        },
      },
    ],
  },
};

describe('Accordian', () => {
  it('renders a Accordian', () => {
    mockRouter.push('/initial-path');
    const rendered = render(<Accordian {...AccordianProps} />);
    expect(rendered.getByTestId('accordian')).toBeTruthy();
  });
});
