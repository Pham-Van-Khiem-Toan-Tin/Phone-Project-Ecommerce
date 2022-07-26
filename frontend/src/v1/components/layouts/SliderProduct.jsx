import React from "react";

const SliderProduct = (props) => {
  const Data = props.data;
  return (
    <div className="container">
      <div
        id="carouselExampleControls1"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {Data.map((data, index) => {
            if (index === 0) {
              return (
                <div key={index} className="carousel-item active">
                  <div className="row">
                    {data.map((data1, index1) => {
                      return (
                        <div key={data1.title} className="col-3">
                          <img
                            src={data1.img}
                            className="d-block w-100"
                            alt={data1.title}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="carousel-item">
                  <div className="row">
                    {data.map((data1, index1) => {
                      return (
                        <div key={data1.tilte} className="col-3">
                          <img
                            src={data1.img}
                            className="d-block w-100"
                            alt={data1.title}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls1"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          >next</span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls1"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default SliderProduct;
