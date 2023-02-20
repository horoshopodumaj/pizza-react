import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PizzaBlock } from "../components";

export default function FullPizza(): JSX.Element {
    const [pizza, setPizza] = useState<{
        id: string;
        title: string;
        price: number;
        imageUrl: string;
        sizes: number[];
        types: number[];
    }>();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://635ab9256f97ae73a634f1e1.mockapi.io/pizzas/${id}`
                );
                setPizza(data);
            } catch (error) {
                console.log(error);
                alert("Ошибка при получении пиццы");
                navigate("/");
            }
        }
        fetchPizza();
    }, []);

    if (!pizza) {
        return <div style={{ textAlign: "center" }}>Loading...</div>;
    }

    return (
        <div className="container container__full">
            <PizzaBlock {...pizza} />
            {/* <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}p</h4> */}
        </div>
    );
}
