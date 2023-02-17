import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FullPizza() {
    const [pizza, setPizza] = useState();
    const { id } = useParams();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://635ab9256f97ae73a634f1e1.mockapi.io/pizzas/${id}`
                );
                setPizza(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPizza();
    }, []);

    if (!pizza) {
        return "Loading";
    }
    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}p</h4>
        </div>
    );
}
