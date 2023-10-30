import {
  ComponentParams,
  ComponentRendering,
  SitecoreContextValue,
} from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};

/**
 * Component props with context
 * You can access `sitecoreContext` by withSitecoreContext/useSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 * @example const { sitecoreContext } = useSitecoreContext()
 */
export type ComponentWithContextProps = ComponentProps & {
  sitecoreContext: SitecoreContextValue;
};

export interface SearchResultCard {
  image_url: string;
  published_date: string;
  name: string;
  id: string;
  page_type: string;
  page_type_icon?: string;
  authors?: null;
  content_type_icon?: string;
  description?: string;
  email?: string;
  authorrole?: string;
  phone_number?: string;
  profile_image?: string;
  source_id: string;
  type: string;
  url: string;
  jurisdictions: string[];
  topics: string[];
  sectors: string[];
  services: string[];
  firstname: string;
  lastname: string;
}
