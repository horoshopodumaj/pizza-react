import React, { useCallback, useEffect, useRef } from "react";
import qs from "qs";
import { Skeleton, PizzaBlock, Sort, Categories, Pagination } from "../components";
import { list } from "../components/Sort";
import { useSelector } from "react-redux";
import { selectFilter } from "../redux/filter/selectors";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/filter/slice";
import { selectPizzaData } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/slice";
import { FetchPizzaParams } from "../redux/pizza/types";

export default function Home(): JSX.Element {
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isSearch = useRef<boolean>(false);
    const isMounted = useRef<boolean>(false);

    const onClickCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sortType = sort.sortProperty.replace("-", "");
        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const search = searchValue ? `&search=${searchValue}` : "";

        dispatch(
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
            const params = qs.parse(
                window.location.search.substring(1)
            ) as unknown as FetchPizzaParams;
            const sort = list.find((obj) => obj.sortProperty === params.sortType);
            dispatch(
                setFilters({
                    categoryId: Number(params.category),
                    currentPage: params.currentPage,
                    searchValue: params.search,
                    sort: sort || list[0],
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
                <Sort sort={sort} />
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
