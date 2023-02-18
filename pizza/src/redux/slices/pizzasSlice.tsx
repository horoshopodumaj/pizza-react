import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
};

interface PizzaSliceState {
    status: "loading" | "success" | "error";
    items: Pizza[];
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
    "pizza/fetchPizzasStatus",
    async (params) => {
        const { category, sortType, order, search, currentPage } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://635ab9256f97ae73a634f1e1.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`
        );
        return data;
    }
);
const initialState: PizzaSliceState = {
    items: [],
    status: "loading", // loading, success, error
};

const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = "loading";
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = "error";
            state.items = [];
        });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
