import authReducer from './auth';
import editionsReducer from './editions';
import myAssignedProductsReducer from './myAssignedProducts';
import myNotAssignedProductsReducer from './myNotAssignedProducts';
import otherAssignedProductsReducer from './otherAssignedProducts';
import definedGroupsReducer from './definedGroups';
import preferencesReducer from './preferences';
import permissionRequestReducer from './permissionRequest';
import userReducer from './user';
import resultsReducer from './results';
import moderatorResultsReducer from './moderatorResults';

export default {
  auth: authReducer,
  editions: editionsReducer,
  myAssignedProducts: myAssignedProductsReducer,
  myNotAssignedProducts: myNotAssignedProductsReducer,
  otherAssignedProducts: otherAssignedProductsReducer,
  definedGroups: definedGroupsReducer,
  preferences: preferencesReducer,
  permissionRequest: permissionRequestReducer,
  user: userReducer,
  results: resultsReducer,
  moderatorResults: moderatorResultsReducer,
};
