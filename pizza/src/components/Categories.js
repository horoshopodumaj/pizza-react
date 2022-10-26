import React, { useState } from "react";

const categories = [
    { id: 1, title: "Все" },
    { id: 2, title: "Мясные" },
    { id: 3, title: "Вегетарианская" },
    { id: 4, title: "Гриль" },
    { id: 5, title: "Острые" },
    { id: 6, title: "Закрытые" },
];
function Categories() {
    const [activeCategory, setActiveCategory] = useState(0);

    const onClickCategory = (id) => {
        setActiveCategory(id);
    };
    return (
        <div className="categories">
            <ul>
                {categories.map((category) => (
                    <li
                        onClick={() => onClickCategory(category.id)}
                        className={activeCategory === category.id ? "active" : ""}
                        key={category.id}>
                        {category.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
