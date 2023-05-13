import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReview,
  getAllReviews,
} from "../../reduxToolkit/actions/productAction";
import { clearError } from "../../reduxToolkit/reducer/product/productReviewSlice";
import {
  clearErrorAction,
  reviewReset,
} from "../../reduxToolkit/reducer/product/reviewSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import "./productReview.css";
const ProductReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, reviews, isLoading } = useSelector(
    (state) => state.allReviews
  );
  const { error: errorDelete, isDelete } = useSelector((state) => state.review);
  const [productIdSearch, setProductIdSearch] = useState("");
  const [productId, setProductId] = useState("");
  const handleSubmitProductReview = (e) => {
    e.preventDefault();
    setProductId(productIdSearch);
    dispatch(getAllReviews(productIdSearch));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (errorDelete) {
      toast.error(errorDelete);
      dispatch(clearErrorAction());
    }
    if (isDelete) {
      toast.success("Review Delete Successfully");
      dispatch(getAllReviews(productId));
      dispatch(reviewReset());
    }
  }, [dispatch, errorDelete, error, isDelete]);

  return (
    <div className="admin_review">
      <form onSubmit={handleSubmitProductReview}>
        <h3>All Reviews</h3>
        <div className="admin_review-search">
          <FaStar />
          <input
            type="text"
            placeholder="Product Id"
            required
            value={productIdSearch}
            onChange={(e) => setProductIdSearch(e.target.value)}
          />
        </div>
        <input type="submit" value="Search" />
      </form>
      {reviews?.length > 0 ? (
        <div className="container table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Review ID</th>
                <th scope="col">User</th>
                <th scope="col">Comment</th>
                <th scope="col">Rating</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.comment}</td>
                    <td>{item.rating}</td>
                    <td className="icon-handle_user">
                      <span>
                        <button
                          onClick={(e) =>
                            dispatch(
                              deleteReview({
                                reviewId: item._id,
                                productId: productId,
                              })
                            )
                          }
                        >
                          <FaTrashAlt />
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>No review Product</h3>
      )}
    </div>
  );
};

export default ProductReview;
