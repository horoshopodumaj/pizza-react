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
};

const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
