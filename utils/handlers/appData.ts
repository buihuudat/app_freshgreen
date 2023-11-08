import {productActions} from '../../actions/productActions';
import {categoryActions} from '../../actions/categoryActions';
import {settingsActions} from '../../actions/settingsActionts';

export const appData = async (dispatch: any) => {
  await Promise.all([
    dispatch(productActions.popular()),
    dispatch(productActions.bestSeller()),
    dispatch(productActions.getProductsView()),
    dispatch(productActions.getBiggestDiscountProducts()),
    dispatch(productActions.newProducts()),
    dispatch(productActions.ratedHighestProducts()),
    dispatch(categoryActions.gets()),
    dispatch(settingsActions.getBanner()),
  ]);
};
