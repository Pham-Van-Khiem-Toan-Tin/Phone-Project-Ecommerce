import React, { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import StarRatings from "react-star-ratings";
import { FaTh, FaThList } from "react-icons/fa";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/product/allProductSlice";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../reduxToolkit/actions/productAction";
import {
  clearErrorCart,
  resetToCart,
} from "../../reduxToolkit/reducer/product/cartProductSlice";
import "./categories.css";

const Categories = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    error,
  } = useSelector((state) => state.allProducts);
  const { error: errorCart, success: successCart } = useSelector(
    (state) => state.cart
  );
  const listCategories = ["Samsung", "Xiaomi", "Apple", "Oppo"];
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRating] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(500);
  const [maxValue1, setMaxValue1] = useState(50000000);

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };
  const { keyword } = useParams();
  let count = filteredProductsCount;
  let pageCouts = [currentPage, currentPage + 1, currentPage + 2];
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (errorCart) {
      toast.error(errorCart);
      dispatch(clearErrorCart());
    }
    if (successCart) {
      toast.success(successCart);
      dispatch(resetToCart());
    }
  }, [dispatch, error, errorCart, successCart]);
  useEffect(() => {
    dispatch(
      getAllProducts({
        keyword,
        currentPage,
        minValue,
        maxValue1,
        category,
        ratings,
      })
    );
  }, [keyword, currentPage, minValue, maxValue, category, ratings, dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="categories">
          <div className="container">
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <span className="fw-bold">Home</span>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="product-categories rounded">
                  <p className="fw-bold">Product categories</p>
                  <ul className="product-categories-list">
                    <li className="product-categories-item">
                      <input type="checkbox" /> <span>Gamming</span>
                    </li>
                    <li className="product-categories-item">
                      <input type="checkbox" /> <span>Selfie</span>
                    </li>
                    <li className="product-categories-item">
                      <input type="checkbox" /> <span>Gamming</span>
                    </li>
                    <li className="product-categories-item">
                      <input type="checkbox" /> <span>Selfie</span>
                    </li>
                  </ul>
                </div>
                <div className="filter-by-price rounded">
                  <p className="fw-bold">Filter By Price</p>
                  <MultiRangeSlider
                    min={0}
                    max={500}
                    step={1}
                    minValue={minValue}
                    maxValue={maxValue}
                    onChange={(e) => {
                      setMinValue(e.minValue);
                      setMaxValue(e.maxValue);
                    }}
                  ></MultiRangeSlider>
                  <p className="price-display">
                    Price: <span>${minValue}</span> - <span>${maxValue}</span>
                  </p>
                </div>
                <div className="filter-by-ratings rounded">
                  <p className="fw-bold">Ratings</p>
                  <ul className="rating-list">
                    <li className="rating-item">
                      <StarRatings
                        rating={5}
                        starRatedColor="rgb(211 118 26)"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                        starSpacing="1px"
                      />
                      <span> (9)</span>
                    </li>
                    <li className="rating-item">
                      <StarRatings
                        rating={4}
                        starRatedColor="rgb(211 118 26)"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                        starSpacing="1px"
                      />
                      <span> (20)</span>
                    </li>
                    <li className="rating-item">
                      <StarRatings
                        rating={3}
                        starRatedColor="rgb(211 118 26)"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                        starSpacing="1px"
                      />
                      <span> (12)</span>
                    </li>
                    <li className="rating-item">
                      <StarRatings
                        rating={2}
                        starRatedColor="rgb(211 118 26)"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                        starSpacing="1px"
                      />
                      <span> (9)</span>
                    </li>
                    <li className="rating-item">
                      <StarRatings
                        rating={1}
                        starRatedColor="rgb(211 118 26)"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                        starSpacing="1px"
                      />
                      <span> (4)</span>
                    </li>
                  </ul>
                </div>
                <div className="filter-by-brand rounded">
                  <p className="fw-bold">Brands</p>
                  <ul className="brand-list">
                    <li className="brand-item">
                      <input type="checkbox" /> <span>SamSung</span>
                    </li>
                    <li className="brand-item">
                      <input type="checkbox" /> <span>Xiaomi</span>
                    </li>
                    <li className="brand-item">
                      <input type="checkbox" /> <span>Apple</span>
                    </li>
                    <li className="brand-item">
                      <input type="checkbox" /> <span>Huwai</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-9 products-content">
                <div className="sorting d-flex align-items-center justify-content-between rounded">
                  <div className="sorting-group d-flex">
                    <button className="btn btn-sm">
                      <FaTh />
                    </button>
                    <button className="btn btn-sm">
                      <FaThList />
                    </button>
                    <select className="form-select" placeholder="Sort By">
                      <option>Sort By</option>
                    </select>
                  </div>
                  <div className="number-of-products">
                    <span>Showing 1-12 of 32 results</span>
                  </div>
                </div>
                <div className="products-gird-content">
                  <div className="row">
                    {products &&
                      products.map((product) => {
                        console.log(product);
                        return (
                          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 p-1">
                            <Card data={product} />
                          </div>
                        );
                      })}
                  </div>
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link active" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
