import style from "./notfoundblock.module.scss";

export function NotFoundBlock(): JSX.Element {
    return (
        <div className={style.root}>
            <h1>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={style.description}>
                К сожалению данная страница отсутствует в нашем интернет-магазине
            </p>
        </div>
    );
}
