import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./avatar.png";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import {
  clearErrorReview,
  newReviewReset,
} from "../../reduxToolkit/reducer/product/newReviewSlice";
import "./product-detail-tabs.css";
import {
  getAllReviews,
  newReview,
} from "../../reduxToolkit/actions/productAction";
const ProductDetailTabs = (props) => {
  const { description, productId } = props;
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  const [tabOpen, setTabOpen] = useState(true);
  const {
    error: errorReview,
    success,
    reviews,
  } = useSelector((state) => state.newReview);
  const handleReviews = () => {
    setTabOpen(false);
  };
  const handleDes = () => {
    setTabOpen(true);
  };
  const handleRating = (newRating) => {
    setRatings(newRating);
  };
  const handleAddSubmit = () => {
    const myForm = new FormData();
    myForm.set("rating", ratings);
    myForm.set("comment", comment);
    myForm.set("product_id", productId);
    dispatch(newReview(myForm));
  };
  useEffect(() => {
    if (errorReview) {
      toast.error(errorReview);
      dispatch(clearErrorReview());
    }
  }, [dispatch, errorReview]);

  useEffect(() => {
    if (success) {
      toast.success("Your's review created!");
      dispatch(newReviewReset());
    }
    dispatch(getAllReviews(productId));
  }, [dispatch, success, productId]);

  return (
    <div className="detail-tabs mt-5">
      <ul className="nav nav-tabs d-flex align-items-center gap-1 justify-content-center">
        <li className=" nav-item ">
          <button
            className={"nav-link " + (tabOpen ? "active" : "")}
            onClick={handleDes}
            data-toggle="tab"
            // href="#home"
          >
            Description
          </button>
        </li>
        <li className="nav-item">
          <button
            className={"nav-link " + (!tabOpen ? "active" : "")}
            onClick={handleReviews}
            data-toggle="tab"
            // href="#menu1"
          >
            Reviews
          </button>
        </li>
      </ul>
      <div className="tab-content">
        <div id="des" className={tabOpen ? "d-block" : "d-none"}>
          <h3>Description</h3>
          <p>{description}</p>
        </div>
        <div id="all-review" className={!tabOpen ? "d-block" : "d-none"}>
          {reviews.length === 0 ? (
            <p>
              You have not rated this product yet. Click{" "}
              <span
                className="text-primary new-review"
                data-bs-toggle="modal"
                data-bs-target="#newReviewModal"
              >
                here
              </span>{" "}
              for reviews
            </p>
          ) : (
            <>
              {reviews.map((item) => (
                <div className="review-box rounded ">
                  <div className="user-box d-flex">
                    <div>
                      <img className="avatar" src={Avatar} />
                      <p>{item?.name}</p>
                    </div>
                    <span className="comment rounded">{item?.comment}</span>
                  </div>
                  {item?.feed_back && (
                    <div className="admin-box d-flex">
                      <div>
                        <img className="avatar" src={Avatar} />
                        <p className="text-center">Admin</p>
                      </div>
                      <span className="comment rounded">{item?.feed_back}</span>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div
        className="modal fade"
        id="newReviewModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-6" id="exampleModalLabel">
                New Review
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="ratings">
                <StarRatings
                  rating={ratings}
                  changeRating={handleRating}
                  starRatedColor="rgb(211 118 26)"
                  numberOfStars={5}
                  name="rating"
                  starDimension="15px"
                  starSpacing="1px"
                />
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleAddSubmit}
                type="button"
                className="btn btn-sm btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTabs;
