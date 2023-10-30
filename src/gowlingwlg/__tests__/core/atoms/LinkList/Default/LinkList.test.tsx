import LinkList from 'core/atoms/LinkList/Default/LinkList';
import { render } from '@testing-library/react';
import { LinkListProps } from 'core/atoms/LinkList/LinkList.types';

describe('LinkList', () => {
  it('renders a LinkList', () => {
    //arrange
    const linkListProps: LinkListProps = {
      fields: {
        data: {
          datasource: {
            children: {
              results: [
                {
                  field: {
                    link: {
                      value: {
                        text: '',
                      },
                      editableFirstPart: 'some',
                      editableLastPart: 'Text',
                    },
                  },
                },
              ],
            },
            field: {
              title: {
                editable: 'false',
                value: 'value',
              },
            },
          },
        },
      },
      params: { test: 'test' },
    };

    //act
    const rendered = render(<LinkList {...linkListProps} />);
    const items = rendered.getByTestId('link-list').children.length;

    //assert
    expect(items).toEqual(1);
  });
});
