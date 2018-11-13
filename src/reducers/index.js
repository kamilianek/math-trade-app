import authReducer from './auth';
import editionsReducer from './editions';
import myAssignedProductsReducer from './myAssignedProducts';
import myNotAssignedProductsReducer from './myNotAssignedProducts';
import otherAssignedProductsReducer from './otherAssignedProducts';

export default {
  auth: authReducer,
  editions: editionsReducer,
  myAssignedProducts: myAssignedProductsReducer,
  myNotAssignedProducts: myNotAssignedProductsReducer,
  otherAssignedProducts: otherAssignedProductsReducer,
};
