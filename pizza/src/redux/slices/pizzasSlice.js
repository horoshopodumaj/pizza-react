import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params) => {
    const { category, sortType, order, search, currentPage } = params;
    const { data } = await axios.get(
        `https://635ab9256f97ae73a634f1e1.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`
    );
    return data;
});

const initialState = {
    items: [],
    status: "", // loading, success, error
};

const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = "loading";
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = "error";
            state.items = [];
        },
    },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
