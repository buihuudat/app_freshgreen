import {ImageSourcePropType} from 'react-native';

export type FeaturedCategoryDataType = {
  image: string;
  title: string;
  count?: number;
  color?: string;
};

export type HomeAdsDataType = {
  image: ImageSourcePropType;
  title: string;
  category: string;
};

export type SaleDataType = {
  image: string;
  title: string;
  countStar: number;
  shop: string;
  price: number;
  discount: number;
  active: boolean;
  url?: string;
};
