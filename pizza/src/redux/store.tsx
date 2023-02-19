import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: { filter: filterReducer, cart: cartReducer, pizza: pizzasSlice },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
