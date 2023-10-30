import { ImageItem } from 'src/global';

export type PositionType = {
  lat: number;
  lng: number;
};

export type MarkerContentType = {
  title: string;
  building: string;
  address1: string;
  address2: string;
  phone: string;
  mobile: string;
  fax: string;
};

export type MarkerType = {
  id: string;
  position: PositionType;
  content: MarkerContentType;
  locationImageUrl?: string;
  alternateImage: ImageItem;
};

export type MapProps = {
  markers: MarkerType[];
};
