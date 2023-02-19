import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { getCartFromLC } from "../../../utils/getCartFromLC";
import { CartItem, CartSliceState } from "./types";

const { items, totalPrice } = getCartFromLC();

const initialState: CartSliceState = {
    items,
    totalPrice,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((item) => item.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((item) => item.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearCart(state) {
            state.items = [];
            state.totalPrice = calcTotalPrice(state.items);
        },
    },
});

export const { addItem, removeItem, clearCart, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
