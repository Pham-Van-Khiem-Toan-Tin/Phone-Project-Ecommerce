import React, { useState } from "react";
import { Data2 } from "../../../data/Data";

import StarRatings from "react-star-ratings";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./Categories.css";
import Card from "../../components/Card/Card";

const Categories = () => {
  const [value, setValue] = useState(50);
  const [finalValue, setFinalValue] = useState(null);
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
