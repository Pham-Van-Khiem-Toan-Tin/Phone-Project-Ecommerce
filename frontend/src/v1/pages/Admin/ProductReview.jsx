import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaCommentMedical,
  FaEdit,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";
import "./product-review.css";
import { deleteReview, getAllReview, updateReview } from "../../reduxToolkit/actions/review.action";
import { reset } from "../../reduxToolkit/reducer/review/review.slice";
const ProductReview = ({ SideBarComponent, HeaderComponent }) => {
  const { reviews, resultPerPage, filteredReviewCount, success, message } =
    useSelector((state) => state.reviews);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    parent: "",
  });
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const handleSearch = () => {
    dispatch(getAllReview({ page: currentPage, key: keyWord.trim() }));
  };
  const handleSelectItemEdit = (item) => {
    setSelectedItem({ ...item });
  };
  const handleCloseEditModal = () => {
    setSelectedItem(null);
  };
  const handleDelete = () => {
    dispatch(deleteReview(selectedItem._id))
  };
  const handleEdit = () => {
    console.log("chay vao day");
    dispatch(
      updateReview({
        id: selectedItem._id,
        description: selectedItem.feed_back.trim(),
      })
    );
  };
  useEffect(() => {
    const storedCurrentPage = JSON.parse(localStorage.getItem("all-category"));
    setCurrentPage(storedCurrentPage || 1);
    dispatch(getAllReview({ page: currentPage, key: keyWord.trim() }));
    if (success) {
      toast.success(message);
      dispatch(reset());
    }
  }, [dispatch, currentPage, success]);

  return (
    <>
      <SideBarComponent />
      <HeaderComponent />
      <div className="review-management">
        <p className="title">Category</p>
        <div className="d-flex align-items-center justify-content-between">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <span className="fw-bold">Home</span>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                reviews
              </li>
            </ol>
          </nav>
        </div>
        <div className="review-list p-2 mt-2 rounded">
          <p className="title">Last Orders</p>
          <div className="btn-handle-group">
            <div className="sort">
              <label htmlFor="sort">Sort by: </label>
              <select className="form-select" id="sort">
                <option value="name">Name</option>
                <option value="day">Created At</option>
              </select>
            </div>
            <div className="search">
              <input
                className="form-control"
                onChange={(e) => setKeyWord(e.target.value)}
                type="text"
                placeholder="key word search"
              />
              <button className="btn btn-sm btn-primary">Search</button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">ProductId</th>
                  <th scope="col">Ratings</th>
                  <th scope="col">Comment</th>
                  <th scope="col">Feedback</th>
                  <th scope="col">CreatedAt</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews &&
                  reviews.map((item) => {
                    return (
                      <tr>
                        <th scope="row">{item?.name}</th>
                        <td>{item?.product_id}</td>
                        <td>{item?.rating}</td>
                        <td>{item?.comment}</td>
                        <td>
                          {item?.feed_back ? item?.feed_back : "No feedback"}
                        </td>
                        <td>
                          {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                        </td>
                        <td className="action">
                          <button
                            type="button"
                            className="btn btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-modal"
                            onClick={() => handleSelectItemEdit(item)}
                          >
                            <FaCommentMedical />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#delete-modal"
                            onClick={() => handleSelectItemEdit(item)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  disabled={currentPage > 1 ? false : true}
                  onClick={() => {
                    if (currentPage > 1) {
                      localStorage.setItem("all-reviews", currentPage - 1);
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button className="page-link active" disabled={true}>
                  {currentPage}
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  disabled={
                    reviews?.length !== resultPerPage &&
                    -currentPage * resultPerPage <= 0
                  }
                  onClick={() => {
                    if (
                      reviews?.length === resultPerPage &&
                      filteredReviewCount - currentPage * resultPerPage > 0
                    ) {
                      localStorage.setItem("all-reviews", currentPage + 1);
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="delete-modal"
        tabIndex="-1"
        aria-labelledby="delete-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="delete-modal-label">
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
             <p>Do you really want to delete this review?</p>
            </div>
            <div className="modal-footer d-flex justify-content-between">
            <button
                type="button"
                className="btn btn-sm btn-submit btn-primary"
                onClick={handleDelete}
                data-bs-dismiss="modal"
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="edit-modal"
        tabIndex="-1"
        aria-labelledby="edit-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="edit-modal-label">
                Feedback
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="create-des">
                Description: <span className="text-danger">*</span>
              </label>
              <textarea
                required
                value={selectedItem?.description}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    feed_back: e.target.value,
                  })
                }
                rows="4"
                className="form-control"
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseEditModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-sm btn-submit btn-primary"
                data-bs-dismiss="modal"
                onClick={handleEdit}
              >
                Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReview;
