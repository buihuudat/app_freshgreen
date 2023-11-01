import {productActions} from '../../actions/productActions';
import {categoryActions} from '../../actions/categoryActions';
import {notificationActions} from '../../actions/notificationActions';
import {settingsActions} from '../../actions/settingsActionts';

export const appData = async (dispatch: any) => {
  await Promise.all([
    dispatch(productActions.popular()),
    dispatch(productActions.bestSeller()),
    dispatch(productActions.getProductsView()),
    dispatch(categoryActions.gets()),
    dispatch(notificationActions.gets()),
    dispatch(settingsActions.getBanner()),
  ]);
};
