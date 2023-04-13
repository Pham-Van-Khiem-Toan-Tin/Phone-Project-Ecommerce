import React, { useState } from "react";
import { Data2 } from "../../../data/Data";
import MultiRangeSlider from "multi-range-slider-react";
import StarRatings from "react-star-ratings";
import "./Categories.css";
import Card from "../../components/Card/Card";

const Categories = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue2, setMinValue2] = useState(0);
  const [maxValue2, setMaxValue2] = useState(0);
  const [rating, setRating] = useState(5);
  const changeRating = (newRating, name) => {
    setRating(newRating);
  };
  return (
    <div className="categories">
      <h1 className="categories-header">Products</h1>
      <div className="categories-content">
        <div className="categories-controller">
          <div className="categories-range">
          <MultiRangeSlider
          onInput={(e) => {
            setMinValue(e.minValue);
            setMaxValue(e.maxValue);
          }}
          onChange={(e) => {
            setMinValue2(e.minValue);
            setMaxValue2(e.maxValue);
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
              rating={rating}
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
              {Data2.map((data) => {
                return (
                  <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <Card data={data} />
                  </div>
                )
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
  );
};

export default Categories;
