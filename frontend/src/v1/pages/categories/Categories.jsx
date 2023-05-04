import React, { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import StarRatings from "react-star-ratings";
import "./Categories.css";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/product/productSlice";
import { useParams } from "react-router-dom";
import { getProducts } from "../../reduxToolkit/actions/productAction";
import ClearToast from "./ClearToast";

const Categories = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    error,
  } = useSelector((state) => state.allproduct);

  const listCategories = ["Samsung", "Xiaomi", "Apple", "Oppo"];
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRating] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(50000000);

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };
  console.log(ratings);
  const { keyword } = useParams();
  let count = filteredProductsCount;
  let pageCouts = [currentPage, currentPage + 1, currentPage + 2];
  useEffect(() => {
    console.log("re-reder");
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(
      getProducts({
        keyword,
        currentPage,
        minValue,
        maxValue,
        category,
        ratings,
      })
    );
  }, [
    keyword,
    currentPage,
    minValue,
    maxValue,
    category,
    ratings,
    dispatch,
    error,
  ]);

  return (
    <>
      <ClearToast />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="categories">
          <div className="categories-content">
            <div className="categories-controller">
              <div className="categories-range">
                <h3>Price</h3>
                <MultiRangeSlider
                  min={0}
                  max={50000000}
                  step={1000000}
                  minValue={minValue}
                  maxValue={maxValue}
                  onChange={(e) => {
                    setMinValue(e.minValue);
                    setMaxValue(e.maxValue);
                  }}
                ></MultiRangeSlider>
              </div>
              <div className="categories-model">
                <h3 className="categories-model-title">Model</h3>
                {listCategories.map((item, index) => {
                  return (
                    <>
                      <div
                        className="categories-model-item"
                        key={item._id}
                        onClick={() => {
                          setCategory(item);
                          setCurrentPage(1);
                        }}
                      >
                        {item}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="categories-rating">
                <StarRatings
                  rating={ratings}
                  starRatedColor="rgb(255, 255, 0)"
                  changeRating={changeRating}
                  numberOfStars={5}
                  name="rating"
                  starHoverColor="rgb(255, 191, 0)"
                  starDimension="20px"
                  starSpacing="2px"
                />
              </div>
            </div>
            <div className="categories-gird">
              <h1 className="categories-header">Products</h1>
              <div className="categories-controller-select">
                <select>
                  <option>Chose price</option>
                  <option>10tr</option>
                  <option>20tr</option>
                  <option>30tr</option>
                  <option>40tr</option>
                  <option>50tr</option>
                </select>
                <select>
                  <option>Chose model</option>
                  <option>Xiaomi</option>
                  <option>Samsung</option>
                  <option>Oppo</option>
                  <option>Iphone</option>
                </select>
                <select>
                  <option>Chose star</option>
                  <option>1 star</option>
                  <option>2 star</option>
                  <option>3 star</option>
                  <option>4 star</option>
                  <option>5 star</option>
                </select>
              </div>
              <div className="categories-gird-content">
                <div className="row">
                  {products &&
                    products.map((product) => {
                      return (
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-6">
                          <Card data={product} />
                        </div>
                      );
                    })}
                </div>
              </div>

              <ul className="pagination-list">
                <li>
                  <button
                    className=""
                    aria-label="Previous"
                    disabled={currentPage === 1 ? true : false}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {pageCouts.map((pageCout) => {
                  console.log(
                    Math.round(filteredProductsCount / resultPerPage) + 1 <
                      pageCout
                  );
                  return (
                    <>
                      <li className="">
                        <button
                          className=""
                          disabled={
                            filteredProductsCount < resultPerPage ||
                            Math.round(filteredProductsCount / resultPerPage) +
                              1 <
                              pageCout
                              ? true
                              : false
                          }
                          onClick={() => setCurrentPage(pageCout)}
                        >
                          {pageCout}
                        </button>
                      </li>
                    </>
                  );
                })}
                <li className="page-">
                  <button
                    className=""
                    aria-label="Next"
                    disabled={
                      filteredProductsCount < resultPerPage ||
                      Math.round(filteredProductsCount / resultPerPage) <
                        currentPage + 1
                        ? true
                        : false
                    }
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
