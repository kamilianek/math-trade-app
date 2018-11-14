import authReducer from './auth';
import editionsReducer from './editions';
import myAssignedProductsReducer from './myAssignedProducts';
import myNotAssignedProductsReducer from './myNotAssignedProducts';
import otherAssignedProductsReducer from './otherAssignedProducts';
import definedGroupsReducer from './definedGroups';

export default {
  auth: authReducer,
  editions: editionsReducer,
  myAssignedProducts: myAssignedProductsReducer,
  myNotAssignedProducts: myNotAssignedProductsReducer,
  otherAssignedProducts: otherAssignedProductsReducer,
  definedGroups: definedGroupsReducer,
};
