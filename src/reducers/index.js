import authReducer from './auth';
import editionsReducer from './editions';
import myAssignedProductsReducer from './myAssignedProducts';
import otherAssignedProductsReducer from './otherAssignedProducts';

export default {
  auth: authReducer,
  editions: editionsReducer,
  myAssignedProducts: myAssignedProductsReducer,
  otherAssignedProducts: otherAssignedProductsReducer,
};
