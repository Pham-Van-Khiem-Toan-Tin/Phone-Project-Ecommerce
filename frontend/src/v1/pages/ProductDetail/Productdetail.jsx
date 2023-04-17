import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

import "./Productdetail.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../reduxToolkit/actions/productAction";
import { useParams } from "react-router-dom";
const Productdetail = () => {
  const dispatch = useDispatch();
  const { error, isLoading, product } = useSelector(
    (state) => state.productdetail
  );
  const { id } = useParams();
  const [quanlityCart, setQuanlityCart] = useState(1);
  console.log(id);
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, []);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <div className="productdetail">
        <div className="productdetail-carousel">
          <div id="productDetail" className="carousel slide">
            <div className="carousel-indicators">
              {product?.images.map((image, index) => {
                return (
                  <>
                    <button
                      type="button"
                      data-bs-target="#productDetail"
                      data-bs-slide-to={`${index}`}
                      className="active"
                      aria-current="true"
                      aria-label={`Slider ${index}`}
                    >
                      test
                    </button>
                  </>
                );
              })}
            </div>
            <div className="carousel-inner">
              {product?.images.map((image) => {
                return (
                  <>
                    <div className="carousel-item active">
                      <img
                        src={image.url}
                        className="d-block w-100"
                        alt={image.url}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="productdetail-content">
          <h2 className="productdetail-name">{product?.name}</h2>
          <p className="productdetail-id"># {product?._id}</p>
          <div className="productdetail-ratings">
            <StarRatings
              rating={product?.ratings ? product.ratings : 5}
              starRatedColor="rgb(255, 255, 0)"
              numberOfStars={5}
              name="rating"
              starHoverColor="rgb(255, 191, 0)"
              starDimension="20px"
              starSpacing="2px"
            />
            <span> ({product?.numOfReview} reviews)</span>
          </div>
          <div className="quanlity-cart">
            <button onClick={() => setQuanlityCart(quanlityCart + 1)}>+</button>
            <input type="number" value={quanlityCart} readOnly />
            <button
              onClick={() => {
                if (quanlityCart > 1) {
                  setQuanlityCart(quanlityCart - 1);
                }
              }}
            >
              -
            </button>
            <button className="detail-to-cart">Add to cart</button>
          </div>
          <div className="productdetail-price">{product?.price} đ</div>
          <div className="productdetail-name">
            Status: {product?.stock > 0 ? "Instock" : "OutOfstock"}
          </div>
          <div className="productdetail-description">
            Description: <p>{product?.description}</p>
          </div>
          <button className="button-review">Submit review</button>
        </div>
      </div>
      <h3>Reviews</h3>
      <div className="listReview">
        {product?.reviews.map((review) => {
          <div className="card">
            <div className="card-header">{review?.name}</div>
            <div className="card-body">
              <StarRatings
                rating={review?.rating}
                starRatedColor="rgb(255, 255, 0)"
                numberOfStars={5}
                name="rating"
                starHoverColor="rgb(255, 191, 0)"
                starDimension="20px"
                starSpacing="2px"
              />
              <h5 className="card-title">Comment: </h5>
              <p className="card-text">{review?.comments}</p>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Productdetail;
