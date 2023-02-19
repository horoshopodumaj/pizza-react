import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filter/slice";
import cartReducer from "./slices/cart/slice";
import pizzasSlice from "./slices/pizzasSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: { filter: filterReducer, cart: cartReducer, pizza: pizzasSlice },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
