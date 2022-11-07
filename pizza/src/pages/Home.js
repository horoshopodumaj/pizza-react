import React, { useContext, useEffect, useRef, useState } from "react";
import qs from "qs";
import axios from "axios";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Sort, { list } from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import { SeacrhContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { searchValue } = useContext(SeacrhContext);
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    const fetchPizzas = () => {
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sortType = sort.sortProperty.replace("-", "");
        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const search = searchValue ? `&search=${searchValue}` : "";
        try {
            setIsLoading(true);
            axios
                .get(
                    `https://635ab9256f97ae73a634f1e1.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`
                )
                .then((res) => {
                    setPizzas(res.data);
                    setIsLoading(false);
                });
        } catch (error) {
            console.error(error);
            alert("Что-то пошло не так");
        }
    };

    //Если был первый рендер, то проверяем URL параметры и сохраняем их в Redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
        }
    }, []);

    //Если был первый рендер, то запрашиваем пиццы

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    //Если изменились параметры после первого рендера
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty.replace("-", ""),
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);

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
            <Pagination onChangePage={onChangePage} />
        </div>
    );
}
