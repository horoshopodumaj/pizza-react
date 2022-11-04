import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import { SeacrhContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

export default function Home() {
    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort);
    const dispatch = useDispatch();

    const { searchValue } = useContext(SeacrhContext);
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    //const [sortType, setSortType] = useState({ name: "популярности", sortProperty: "rating" });

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };
    useEffect(() => {
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sort = sortType.sortProperty.replace("-", "");
        const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
        const search = searchValue ? `&search=${searchValue}` : "";
        try {
            setIsLoading(true);
            axios
                .get(
                    `https://635ab9256f97ae73a634f1e1.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`
                )
                .then((res) => {
                    setPizzas(res.data);
                    setIsLoading(false);
                });
        } catch (error) {
            console.error(error);
            alert("Что-то пошло не так");
        }
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                    : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
                {}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    );
}
