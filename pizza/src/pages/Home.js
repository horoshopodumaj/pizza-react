import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";

export default function Home() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            axios.get("https://635ab9256f97ae73a634f1e1.mockapi.io/pizzas").then((res) => {
                setPizzas(res.data);
                setIsLoading(false);
            });
        } catch (error) {
            console.error(error);
            alert("Что-то пошло не так");
        }
    }, []);
    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
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
