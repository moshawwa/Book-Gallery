import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: [''],
  // blacklist: []
};

const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
