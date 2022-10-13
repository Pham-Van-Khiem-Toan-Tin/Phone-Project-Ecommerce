import React from "react";

const Card = (props) => {
    const {data} = props; 
  return (
    <>
      <div className="card" style={{ width: "100%" }}>
        <img src={data.img} className="card-img-top" alt={data.title} />
        <div className="card-body">
          <h5 className="card-title">{data.title}</h5>
          <p className="card-text">
            Some quick example text to build on the card title
          </p>
          <button class="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </>
  );
};

export default Card;
