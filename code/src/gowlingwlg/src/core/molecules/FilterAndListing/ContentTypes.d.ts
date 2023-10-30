export interface Content {
  authors: string[] | null;
  content_type_icon: string;
  cpd_or_cle: string;
  description: string;
  id: string;
  image_url: string;
  jurisdictions: string[] | null;
  name: string;
  offices: string[] | null;
  page_type: string;
  page_type_icon: string;
  published_date: string;
  sectors: string[] | null;
  services: string[] | null;
  source_id: string;
  topics: string[] | null;
  profile_image?: string;
  type: string;
  url: string;
}
