import {productActions} from '../../actions/productActions';
import {categoryActions} from '../../actions/categoryActions';
import {shopActions} from '../../actions/shopActions';
import {newsActions} from '../../actions/newsActions';

export const appData = async (dispatch: any) => {
  await Promise.all([
    dispatch(productActions.gets({page: 1})),
    dispatch(categoryActions.gets()),
    dispatch(shopActions.gets()),
    dispatch(newsActions.gets()),
  ]);
};
