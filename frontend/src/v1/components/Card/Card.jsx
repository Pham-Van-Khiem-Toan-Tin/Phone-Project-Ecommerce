import React from "react";
import StarRatings from "react-star-ratings";
import "./Card.css";
const Card = (props) => {
  const { data } = props;
  return (
    <>
      <div className="card" style={{ width: "100%" }}>
        <img src={data.images[0].url} className="card-img-top" alt={data.name} />
        <div className="card-body">
          <h5 className="card-title">
            <div className="card-name">{data.name}</div>
            <div className="card_price">{data.price}</div>
          </h5>
          <div className="card-star">
          <StarRatings
              rating={2.5}
              starRatedColor="rgb(211 118 26)"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="1px"
            />
          </div>
          <button class="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </>
  );
};

export default Card;
