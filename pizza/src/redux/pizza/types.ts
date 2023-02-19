export type Pizza = {
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

export interface PizzaSliceState {
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
