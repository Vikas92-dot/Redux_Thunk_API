import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export default Store;
export const persistor = persistStore(Store);
