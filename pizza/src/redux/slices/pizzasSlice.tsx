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

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

interface PizzaSliceState {
    status: Status;
    items: Pizza[];
}

export type FetchPizzaParams = {
    category: string;
    sortType: string;
    order: string;
    search: string;
    currentPage: number;
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzaParams>(
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
    status: Status.LOADING, // loading, success, error
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
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
