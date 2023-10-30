import { Widgets } from '../../../core/molecules/RelatedInsights/RelatedInsights.types';

interface Params {
  searchSource: string;
  country: string;
  language: string;
  services: string[];
  sectors: string[];
  jurisdictions: string[];
  category?: string;
  pagetype?: string;
}

const RelatedInsightSearchFilterQueryFn = (
  url: string,
  { searchSource, country, language, services, sectors, jurisdictions, category, pagetype }: Params
): Promise<Widgets> => {
  // Create filter arrays for services, sectors, and jurisdictions
  const serviceFilters = services?.map((service) => ({
    name: 'services',
    type: 'eq',
    value: service,
  }));

  const sectorFilters = sectors?.map((sector) => ({
    name: 'sectors',
    type: 'eq',
    value: sector,
  }));

  const jurisdictionFilters = jurisdictions?.map((jurisdiction) => ({
    name: 'jurisdictions',
    type: 'eq',
    value: jurisdiction,
  }));
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: 'rfkid_7',
            search: {
              content: {},
              query: {
                keyPhrase: ' ', // You can update this key phrase if needed
              },
              filter: {
                type: 'and',
                filters: [
                  {
                    type: 'or',
                    filters: serviceFilters,
                  },
                  {
                    type: 'or',
                    filters: sectorFilters,
                  },
                  {
                    type: 'or',
                    filters: jurisdictionFilters,
                  },
                  {
                    name: 'type',
                    type: 'eq',
                    value: category,
                  },
                  {
                    name: 'page_type',
                    type: 'eq',
                    value: category === 'Insights' ? pagetype : '',
                  },
                ],
              },
              sort: {
                value: [
                  {
                    order: 'desc',
                    name: 'published_date',
                  },
                ],
              },
              limit: 15, // Limit the number of results
            },
            sources: [searchSource],
          },
        ],
      },
      context: {
        locale: {
          country: country.toLowerCase(), // Convert to lowercase
          language,
        },
      },
    }),
  }).then((res: Response) => {
    return res.json();
  });
};

export default RelatedInsightSearchFilterQueryFn;
