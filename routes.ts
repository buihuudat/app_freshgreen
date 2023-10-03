import {CommentType} from './types/commentType';
import {NewsType} from './types/newsType';
import {OrderItemType} from './types/orderType';
import {PayData} from './types/paymentType';
import {ProductType, ShopProductType} from './types/productType';
import {ShopType} from './types/shopType';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Products: undefined;
  StoreDetails: {storeId: string};
  ProductDetail: {product: ProductType};
  ProductReviews: {
    comments: Array<CommentType>;
    productName: string;
    averageStarRating: number;
    productId: string;
  };
  Categories: undefined;
  FAQ: undefined;
  Settings: undefined;
  Contact: undefined;
  NewsDetails: {news: NewsType};

  Spending: {orders: Array<OrderItemType>};
  Refure: {orders: Array<OrderItemType>};
  Done: {orders: Array<OrderItemType>};

  Cart: undefined;
  Favorite: undefined;
  Profile: undefined;
  Account: undefined;
  Payment: {payData: PayData; order: OrderItemType};
  OrderManager: undefined;
  History: undefined;

  HomeTab: undefined;

  Search: undefined;
  Notification: undefined;
  Message: undefined;

  Login: undefined;
  Register: undefined;
};
