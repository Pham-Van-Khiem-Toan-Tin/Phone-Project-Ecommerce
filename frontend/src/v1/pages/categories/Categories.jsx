import React, { useEffect, useState } from "react";
import { Data2 } from "../../../data/Data";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRating] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(3000);
  
 
  const changeRating = (newRating, name) => {
    setRating(newRating);
  };
  console.log(ratings);
  const { keyword } = useParams();
  let count = filteredProductsCount;
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getProducts({keyword, currentPage, minValue, maxValue, category, ratings}))
  }, [keyword, currentPage, minValue, maxValue, category, ratings, dispatch, error, toast, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="categories">
          <h1 className="categories-header">Products</h1>
          <div className="categories-content">
            <div className="categories-controller">
              <div className="categories-range">
                <MultiRangeSlider
                  min={0}
                  max={3000}
                  step={100}
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
                <div className="categories-model-item">SamSung</div>
                <div className="categories-model-item">XiaoMi</div>
                <div className="categories-model-item">Apple</div>
                <div className="categories-model-item">Oppo</div>
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
              <div className="categories-gird-content">
                <div className="row">
                  {products && products.map((product) => {
                    return (
                      <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-6">
                        <Card data={product} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="categories-gird-pagination d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <button class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                <li class="page-item">
                  <button class="page-link">1</button>
                </li>
                <li class="page-item">
                  <button class="page-link">2</button>
                </li>
                <li class="page-item">
                  <button class="page-link">3</button>
                </li>
                <li class="page-item">
                  <button class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
