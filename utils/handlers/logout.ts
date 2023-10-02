import {dataStorage} from './dataStorage';

export const logout = async () => {
  await dataStorage.removeItem('user');
  await dataStorage.removeItem('cart');
  await dataStorage.removeItem('order');
  await dataStorage.removeItem('favorite');
};
