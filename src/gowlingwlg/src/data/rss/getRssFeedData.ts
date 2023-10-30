import { getSearchResutls } from 'data/searchQuery';
import { FilterOption } from 'utils/search/FilterOption';

interface Params {
  type: string;
  searchSource: string;
  country: string;
  language: string;
  limit: number;
  offset: number;
  topic?: string;
}

interface RssFeed {
  id: string;
  name: string;
  published_date: string;
  source_id: string;
  url: string;
  description: string;
}

const getRssFeedData = (
  url: string,
  { type, searchSource, country, language, limit, offset, topic }: Params
) => {
  const rfk_id = 'rfkid_7';
  const content = ['description', 'id', 'name', 'url', 'published_date'];
  const filters: FilterOption[][] = [
    [
      {
        name: 'type',
        type: 'eq',
        value: type,
      },
    ],
  ];

  if (topic) {
    filters[0].push({
      name: type.toLocaleLowerCase(),
      type: 'eq',
      value: topic,
    });
  }

  return getSearchResutls<RssFeed>(url, {
    rfk_id,
    country,
    language,
    limit,
    offset,
    searchSource,
    content,
    filters,
  });
};

export default getRssFeedData;
