import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketmasterEvent } from "../../../types/eventListType";

interface FavoritesState {
  favorites: TicketmasterEvent[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<TicketmasterEvent>) => {
      const event = action.payload;
      const index = state.favorites.findIndex((e) => e.id === event.id);
      if (index !== -1) {
        // Event is already in favorites, remove it
        state.favorites.splice(index, 1);
      } else {
        // Event is not in favorites, add it
        state.favorites.push(event);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((e) => e.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
