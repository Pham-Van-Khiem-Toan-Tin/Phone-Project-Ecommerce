import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { Data2 } from "../../../data/Data";
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
      <div className="container mt-5">
        <div className="row">
          <div className="categories_menu col-lg-2 col-12 d-lg-block d-flex flex-row align-items-center justify-content-between">
            <div className="search-price">
              <label htmlFor="searchPrice" className="form-label fs-3 fw-bold">
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
                <label
                  htmlFor="searchModel"
                  className="form-label fs-3 fw-bold"
                >
                  Model
                </label>
                <select
                  className="form-select"
                  aria-label="searchModel"
                  defaultValue="Samsung"
                >
                  <option value="SamSung">SamSung</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Apple">Apple</option>
                  <option value="Oppo">Oppo</option>
                  <option value="VinSmart">VinSmart</option>
                </select>
              </div>
            </div>
            <div className="search-rating">
              <label htmlFor="searchStart" className="form-label fs-3 fw-bold">
                Star
              </label>
              <select
                className="form-select"
                aria-label="searchStar"
                defaultValue="all"
              >
                <option value="all">All</option>
                <option value="1">1 Sao</option>
                <option value="2">2 Sao</option>
                <option value="3">3 Sao</option>
                <option value="3">4 Sao</option>
                <option value="3">5 Sao</option>
              </select>
            </div>
          </div>
          <div className="categories_product-slider col-lg-10 col-12">
            <div className="row">
              {Data2.map((data, index) => {
                return (
                  <div
                    className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-12 p-2 m-0"
                    key={index}
                  >
                    <div className="card" style={{ width: "100%" }}>
                      <img
                        src={data.img}
                        className="card-img-top"
                        alt={data.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="row">
              <div className="col d-flex align-items-center justify-content-center">
                <nav aria-label="categoriesPagination">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link">Previous</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
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
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
