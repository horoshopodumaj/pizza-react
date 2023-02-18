import React from "react";
import ReactPaginate from "react-paginate";
import style from "./Pagination.module.scss";

type PaginationProps = {
    onChangePage: any;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
    return (
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
};

export default Pagination;
