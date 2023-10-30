import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

type ImageItem = {
  src: string;
  height: number;
  width: number;
  alt: string;
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type FieldType = {
  value: string;
};

type AssetItem = {
  id: string;
  name: string;
  description: string | null;
  assetType: string;
  createDate: string | null;
  publishDate: string | null;
  updateDate: string | null;
  files: FileItem[];
};

type FileItem = {
  name: string;
  url: string;
  width: number;
  height: number;
  fileSize: number;
};

type MetapropertieItem = {
  Asset_Subtype: string[];
  extension: string[];
  Asset_Type: string[];
};

type AlternateImage = ImageItem & {
  asset: AssetItem;
  metaproperties: MetapropertieItem;
};
