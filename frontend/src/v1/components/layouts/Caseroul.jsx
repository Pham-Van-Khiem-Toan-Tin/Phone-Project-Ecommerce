import React from "react";
import Caseroul1 from "../../../data/caseroul/caseroul1.png";
import Caseroul2 from "../../../data/caseroul/caseroul2.png";
import Caseroul3 from "../../../data/caseroul/caseroul3.png";
const Caseroul = () => {
  return (
    <div className="container mt-5">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Caseroul1} className="d-block w-100" alt="Caseroul1" />
          </div>
          <div className="carousel-item">
            <img src={Caseroul2} className="d-block w-100" alt="Caseroul2" />
          </div>
          <div className="carousel-item">
            <img src={Caseroul3} className="d-block w-100" alt="Caseroul3" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Caseroul;
