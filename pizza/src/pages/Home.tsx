import React, { useEffect, useRef } from "react";
import qs from "qs";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Sort, { list } from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

export default function Home(): JSX.Element {
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sortType = sort.sortProperty.replace("-", "");
        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const search = searchValue ? `&search=${searchValue}` : "";

        dispatch(
            //@ts-ignore
            fetchPizzas({
                category,
                sortType,
                order,
                search,
                currentPage,
            })
        );
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
            getPizzas();
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
            {status === "error" ? (
                <div className="content__error-info">
                    <h2>
                        Произошла ошибка <span>😕</span>
                    </h2>
                    <p>Приносим свои извинения, мы скоро всё починим.</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading"
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                        : items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />)}
                </div>
            )}

            <Pagination onChangePage={onChangePage} />
        </div>
    );
}
