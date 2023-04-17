import React, { useEffect } from "react";
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
              <button
                type="button"
                data-bs-target="#productDetail"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              >
                test
              </button>
              <button
                type="button"
                data-bs-target="#productDetail"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#productDetail"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="../../assets/images/sliders/slider1.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="../../assets/images/sliders/slider2.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="../../assets/images/sliders/slider3.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="productdetail-content">
          <h2 className="productdetail-name">{product?.name}</h2>
          <p className="productdetail-id">{product?._id}</p>
          <div className="productdetail-ratings">
            <StarRatings
              rating={product.ratings}
              starRatedColor="rgb(255, 255, 0)"
              numberOfStars={5}
              name="rating"
              starHoverColor="rgb(255, 191, 0)"
              starDimension="20px"
              starSpacing="2px"
            />
            <span> ({product?.reviews} reviews)</span>
          </div>
          <div className="productdetail-price">{product?.price}</div>
          <div className="productdetail-name">
            Status: {product.stock > 0 ? "Instock" : "OutOfstock"}
          </div>
          <div>
            Description: <p>{product?.description}</p>
          </div>
          <button>Submit review</button>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;
