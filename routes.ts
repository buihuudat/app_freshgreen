import {CommentType} from './types/commentType';
import {FromType} from './types/messageType';
import {NewsType} from './types/newsType';
import {OrderItemType} from './types/orderType';
import {PayData} from './types/paymentType';
import {ProductType} from './types/productType';

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
  Chat: {
    from: FromType;
  };

  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  LoginWithSMS: undefined;
};
