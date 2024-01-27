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

const Categories = ({ HeaderComponent, FooterComponent }) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    error,
  } = useSelector((state) => state.allProducts);
  console.log( {
    isLoading,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    error,
  });
  const { error: errorCart, success: successCart } = useSelector(
    (state) => state.cart
  );
  const listCategories = ["Pro", "Pro Max", "Plus", "SE"];
  const brand = ["Samsung", "Apple", "Xiaomi", "Oppo"];
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRating] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(2200);

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
    const storedCurrentPage = JSON.parse(localStorage.getItem("currentPage"));
    const storedCategory = localStorage.getItem("category");
    const storedRatings = JSON.parse(localStorage.getItem("ratings"));
    const storedMinValue = JSON.parse(localStorage.getItem("minValue"));
    const storedMaxValue = JSON.parse(localStorage.getItem("maxValue"));
    setCurrentPage(storedCurrentPage || 1);
    setCategory(storedCategory || "");
    setRating(storedRatings || 0);
    setMinValue(storedMinValue || 0);
    setMaxValue(storedMaxValue || 2200);
    dispatch(
      getAllProducts({
        keyword,
        currentPage,
        minValue,
        maxValue,
        category,
        ratings,
      })
    );
  }, [keyword, currentPage, minValue, maxValue, category, ratings, dispatch]);

  return (
    <>
      <HeaderComponent />
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
                    {listCategories.map((cate) => {
                      return (
                        <li className="product-categories-item">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              // localStorage.setItem("category", cate);
                              // setCategory(cate);
                            }}
                          />{" "}
                          <span>{cate}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="filter-by-price rounded">
                  <p className="fw-bold">Filter By Price</p>
                  <MultiRangeSlider
                    min={0}
                    max={2200}
                    step={10}
                    minValue={minValue}
                    maxValue={maxValue}
                    onChange={(e) => {
                      localStorage.setItem("minValue", e.minValue);
                      localStorage.setItem("maxValue", e.maxValue);
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
                    {[1, 2, 3, 4, 5].reverse().map((item) => {
                      return (
                        <li
                          className="rating-item"
                          onClick={() => {
                            localStorage.setItem("ratings", item);
                            setRating(item);
                          }}
                        >
                          <StarRatings
                            rating={item}
                            starRatedColor="rgb(211 118 26)"
                            numberOfStars={5}
                            name="rating"
                            starDimension="15px"
                            starSpacing="1px"
                          />
                          <span> (9)</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="filter-by-brand rounded">
                  <p className="fw-bold">Brands</p>
                  <ul className="brand-list">
                    {brand.map((br) => {
                      return (
                        <li
                          className="brand-item"
                          onClick={() => {
                            localStorage.setItem("category", br);
                            setCategory(br);
                          }}
                        >
                          <input type="checkbox" checked={br === localStorage.getItem("category")}/> <span>{br}</span>
                        </li>
                      );
                    })}
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
                    <span>Showing 1-{resultPerPage} of {filteredProductsCount} results</span>
                  </div>
                </div>
                <div className="products-gird-content">
                  <div className="row">
                    {products &&
                      products.map((product) => {
                        return (
                          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 p-1">
                            <Card data={product} />
                          </div>
                        );
                      })}
                  </div>
                  <ul className="pagination">
                    <li className="page-item" >
                      <button
                        className="page-link"
                        disabled={currentPage > 1 ? false : true}
                        onClick={() => {
                          if (currentPage > 1) {
                            localStorage.setItem(
                              "currentPage",
                              currentPage - 1
                            );
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
                    <li className="page-item"  >
                      <button
                        className="page-link"
                        disabled={products?.length != resultPerPage && filteredProductsCount - currentPage * resultPerPage <= 0}
                        onClick={() => {
                          if (products?.length == resultPerPage && filteredProductsCount - currentPage * resultPerPage > 0) {
                            localStorage.setItem(
                              "currentPage",
                              currentPage + 1
                            );
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
          </div>
        </div>
      )}
      <FooterComponent />
    </>
  );
};

export default Categories;
