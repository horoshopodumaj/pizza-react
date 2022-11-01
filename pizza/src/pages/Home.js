import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";

export default function Home() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState(0);

    useEffect(() => {
        try {
            setIsLoading(true);
            axios
                .get("https://635ab9256f97ae73a634f1e1.mockapi.io/pizzas?category=" + categoryId)
                .then((res) => {
                    setPizzas(res.data);
                    setIsLoading(false);
                });
        } catch (error) {
            console.error(error);
            alert("Что-то пошло не так");
        }
        window.scrollTo(0, 0);
    }, [categoryId]);
    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(id) => {
                        setCategoryId(id);
                    }}
                />
                <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                    : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
                {}
            </div>
        </div>
    );
}
