import React, { FC, Fragment, useState } from "react";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

type PageParam = {
  currentPage: number;
};

interface PaginationProps {
  totalRecords: number;
  pageNeighbours: number;
  totalPages: number;
  pageLimit: number;
  onPageChanged: (pageNumber: PageParam) => void;
}

const Pagination: FC<PaginationProps> = (props) => {
  const { pageNeighbours = 0 } = props;
  const [state, setState] = useState({
    currentPage: 1,
    pageNeighbour: Math.max(0, Math.min(pageNeighbours, 2))
  });

  const gotoPage = (page: number) => {
    const { onPageChanged = (f) => f, totalPages } = props;

    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage
    };
    setState({
      ...state,
      currentPage
    });

    onPageChanged(paginationData);
  };

  const handleClick = (page: number, evt: any) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt: any) => {
    evt.preventDefault();
    gotoPage(state.currentPage - state.pageNeighbour * 2 - 1);
  };

  const handleMoveRight = (evt: any) => {
    evt.preventDefault();
    gotoPage(state.currentPage + state.pageNeighbour * 2 + 1);
  };

  const fetchPageNumbers = () => {
    const { totalPages } = props;
    const currentPage = state.currentPage;
    const pageNeighbours = state.pageNeighbour;

    const totalNumbers = state.pageNeighbour * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  const { totalRecords, totalPages } = props;
  if (!totalRecords) return null;

  if (totalPages === 1) return null;

  const { currentPage } = state;
  const pages = fetchPageNumbers();

  return (
    <Fragment>
      <nav aria-label="character Pagination">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index} className="page-item">
                  <button
                    className="page-link"
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index} className="page-item">
                  <button
                    className="page-link"
                    aria-label="Next"
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              );

            return (
              <li
                key={index}
                className={`page-item${currentPage === page ? " active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={(e) => handleClick(+page, e)}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Pagination;
