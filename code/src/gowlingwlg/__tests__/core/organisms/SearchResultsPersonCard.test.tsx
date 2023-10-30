import SerchResultsPersonCard from 'core/organisms/SerchResultsPersonCard';
import type { SearchResultCard } from 'lib/component-props';
import { render } from '@testing-library/react';

const props: {
  personList: SearchResultCard[];
} = {
  personList: [
    {
      id: 'id',
      name: 'name',
      description: 'description',
      url: 'url',
      profile_image: 'https://profile_image',
      content_type_icon: '/content_type_icon',
      type: 'type',
      email: 'email',
      phone_number: 'phone_number',
      image_url: 'https://image_url',
      published_date: '000',
      page_type: 'people',
      source_id: '222',
      jurisdictions: [],
      topics: [],
      sectors: [],
      services: [],
      firstname: 'firstname',
      lastname: 'lastname',
    },
  ],
};

describe('SerchResultsPersonCard', () => {
  it('should render SerchResultsPersonCard component', () => {
    const rendered = render(<SerchResultsPersonCard {...props} />);
    expect(rendered.getByTestId('search-results-list')).toBeTruthy();
  });
});
