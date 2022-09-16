import React from "react";
import { FaArrowDown } from "react-icons/fa";
import "./Categories.css";
const Categories = () => {
  return (
    <div className="Categories">
      <div className="container container_banner-app d-flex flex-lg-row flex-column flex-wrap justify-content-between align-items-center">
        <div className="d-flex fle-wrap align-items-center flex-lg-row flex-column">
          <img src="/assets/images/categories/icon_welcome.svg" alt="logo" />
          <h1>Chào mừng bạn đến với shop</h1>
        </div>
        <button className="button_dowload-app">Tải app</button>
      </div>
      <div className="container d-flex flex-lg-row flex-column">
        <div className="categories_menu flex-grow-lg-1 d-lg-block d-flex flex-row align-items-center justify-content-between">
          <div className="search-price">
            <label for="searchPrice" className="form-label fs-3 fw-bold">
              Search Price
            </label>
            <input type="range" className="form-range" id="searchPrice" />
          </div>
          <div className="search-model">
            <div className="d-lg-block d-none">
              <h4 className="fs-3 fw-bold">Model</h4>
              <div className="ms-4">SamSung</div>
              <div className="ms-4">Xiaomi</div>
              <div className="ms-4">Apple</div>
              <div className="ms-4">Oppo</div>
              <div className="ms-4">VinSmart</div>
            </div>
            <div className="d-lg-none d-block">
              <label for="searchModel" className="form-label fs-3 fw-bold">
                Model
              </label>
              <select className="form-select" aria-label="searchModel">
                <option value="SamSung">SamSung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Apple">Apple</option>
                <option value="Oppo">Oppo</option>
                <option value="VinSmart">VinSmart</option>
              </select>
            </div>
          </div>
          <div className="search-rating">
            <label for="searchStart" className="form-label fs-3 fw-bold">
              Star
            </label>
            <select className="form-select" aria-label="searchStar">
              <option selected>All</option>
              <option value="1">1 Sao</option>
              <option value="2">2 Sao</option>
              <option value="3">3 Sao</option>
              <option value="3">4 Sao</option>
              <option value="3">5 Sao</option>
            </select>
          </div>
        </div>
        <div className="categories_product-slider flex-grow-lg-9">
          <div className="row">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
