import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";

export const store = configureStore({
    reducer: { filter: filterReducer, cart: cartReducer, pizza: pizzasSlice },
});
