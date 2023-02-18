import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import style from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const onClearInput = () => {
        dispatch(setSearchValue(""));
        setValue("");
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 500),
        []
    );

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div className={style.root}>
            <svg className={style.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g data-name="Layer 2" id="Layer_2">
                    <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" />
                </g>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={style.input}
                placeholder="Поиск пиццы..."
            />
            {value && (
                <svg
                    className={style.clear}
                    onClick={onClearInput}
                    height="48"
                    viewBox="0 0 48 48"
                    width="48"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
                    <path d="M0 0h48v48h-48z" fill="none" />
                </svg>
            )}
        </div>
    );
};

export default Search;
