import { baseApi } from "./api/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";
import { persistReducer, persistStore } from "redux-persist";
import { mmkvStorage } from "../utils/mmkvStorage";

const themeConfig = {
  key: "theme",
  storage: mmkvStorage,
};

const favoritesConfig = {
  key: "favorites",
  storage: mmkvStorage,
};

const persistedThemeReducer = persistReducer(themeConfig, themeReducer);
const persistedFavoritesReducer = persistReducer(
  favoritesConfig,
  favoritesReducer,
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    theme: persistedThemeReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
