import React from "react";
import ReactPaginate from "react-paginate";
import style from "./Pagination.module.scss";

type PaginationProps = {
    onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => (
    <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        //renderOnZeroPageCount={null}
    />
);
