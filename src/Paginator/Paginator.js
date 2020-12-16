import React from "react";
import ReactPaginate from "react-paginate";

const Paginator = (props) => {
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * 10;
    let isSolved = false;
    switch (props.questionType) {
      case "Unsolved":
        break;
      case "Solved":
        isSolved = true;
        break;
      case "All":
        isSolved = null;
        break;
      default:
        break;
    }
    props.fetchQuestions(
      offset,
      isSolved,
      props.myQuestion,
      props.user.username
    );
  };
  return (
    <div className="pagination-box">
      <ReactPaginate
        pageCount={Math.ceil(props.totalCount / 10)}
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={(e) => handlePageClick(e)}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

Paginator.defaultProps = {
  user: {
    username: null,
  },
};

export default Paginator;
