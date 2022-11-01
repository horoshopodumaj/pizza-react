import React from "react";

const categories = [
    { id: 0, title: "Все" },
    { id: 1, title: "Мясные" },
    { id: 2, title: "Вегетарианская" },
    { id: 3, title: "Гриль" },
    { id: 4, title: "Острые" },
    { id: 5, title: "Закрытые" },
];
function Categories({ value, onClickCategory }) {
    return (
        <div className="categories">
            <ul>
                {categories.map((category) => (
                    <li
                        onClick={() => onClickCategory(category.id)}
                        className={value === category.id ? "active" : ""}
                        key={category.id}>
                        {category.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
