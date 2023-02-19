import { memo } from "react";
import { useWhyDidYouUpdate } from "ahooks";

const categories = [
    { id: 0, title: "Все" },
    { id: 1, title: "Мясные" },
    { id: 2, title: "Вегетарианская" },
    { id: 3, title: "Гриль" },
    { id: 4, title: "Острые" },
    { id: 5, title: "Закрытые" },
];

type CategotiesProps = {
    value: number;
    onClickCategory: (id: number) => void;
};
function Categories({ value, onClickCategory }: CategotiesProps): JSX.Element {
    useWhyDidYouUpdate("Categories", { value, onClickCategory });
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

export default memo(Categories);
