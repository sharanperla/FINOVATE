import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import transactionReducer from './transactions/transaction.slice'
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer=combineReducers({
  user:userReducer,
  transaction: transactionReducer,
})

const persistConfig={
  key:'root',
  storage,
  version:1,
}

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store= configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
}),
})

export const persistor=persistStore(store, null, () => {
  console.log('Redux Persist is working!');
});