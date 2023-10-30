import { SORT, FILTER_TYPE } from './config';

export interface FilterOption {
  type: FILTER_TYPE;
  name: string;
  value: string;
}

export interface SortOption {
  order: SORT;
  name: string;
}

export interface FacetType {
  name: string;
  max?: number;
}

export interface FacetOption {
  types: FacetType[];
  sort: SortOption;
}

export interface SearchQueryOptions {
  rfk_id: string;
  searchSource: string;
  country: string;
  language: string;
  limit: number;
  offset: number;
  filters?: FilterOption | FilterOption[][];
  sort?: SortOption[];
  keyphrase?: string;
  content?: string[];
  facet?: FacetOption;
  enabled?: boolean;
  useRouter?: boolean;
}

export type FacetValueItem = {
  id: string;
  count?: number;
  text: string;
};

export interface SearchResponse<T> {
  widgets: {
    rfk_id: string;
    type: string;
    entity: string;
    content?: T[];
    facet?: {
      name: string;
      label: string;
      value: FacetValueItem[];
    }[];
    total_item: number;
    limit: number;
    offset: number;
    response_context: {};
  }[];
  dt: number;
  ts: number;
}

type UseSearchQueryProps = Omit<
  SearchQueryOptions,
  'searchApiUrl' | 'searchSource' | 'language' | 'country'
>;
