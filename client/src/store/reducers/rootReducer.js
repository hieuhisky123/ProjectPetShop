import { combineReducers } from "redux";
import appReducer from "./appReducer";
import newsReducer from "./newsReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import testPersistReducer from "./testPersistReducer";
import getFooterHight from "./interfaceReducer";
import userReducer from '../user/userSlice'; // Assuming you named it userReducer

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const commonPersistConfig = {
  key: 'shop/user',
  storage: storage,
  whitelist: ['isLoggedIn', 'token'] // chỉ lưu các trường này
};

const testPersisConfig = {
  ...commonConfig,
  key: "tPersist",
  whitelist: ["curData"], //những giá trị cần giữ lại trong storage
};

const rootReducer = combineReducers({
  app: appReducer,
  paper: newsReducer,
  interf: getFooterHight,
  testPersis: persistReducer(testPersisConfig, testPersistReducer),
  user: persistReducer(commonPersistConfig, userReducer)
});

export default rootReducer;
