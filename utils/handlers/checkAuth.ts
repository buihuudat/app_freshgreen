import {cartActions} from '../../actions/cartActions';
import {favoriteActions} from '../../actions/favoriteActions';
import {orderActions} from '../../actions/orderActions';
import {userActions} from '../../actions/userActions';
import {dataStorage} from './dataStorage';

export const checkAuth = async (dispatch: any) => {
  const user = await dataStorage.getItem('user');

  if (user) {
    // socket.emit('user-login', user);
    await Promise.all([
      dispatch(userActions.getUser(user)),
      dispatch(favoriteActions.get(user)),
      dispatch(cartActions.getCart(user)),
      dispatch(orderActions.getOrders(user)),
    ]);
  }
};
