import React from "react";
import StarRatings from "react-star-ratings";
import { addItemToCart } from "../../reduxToolkit/actions/cartAction";
import { useDispatch } from "react-redux";

import { FaEye, FaHeart, FaCartPlus } from "react-icons/fa";

import "./card.css";
import { Link } from "react-router-dom";
const Card = (props) => {
  const dispatch = useDispatch();

  const { data } = props;

  return (
    <div className="product_card">
      <div className="product_img">
        <img src={data.images[0].url} alt={data.name} />
      </div>
      <div className="product_name">
        <span>{data.name}</span>
      </div>
      <div className="product_price">
        <span>{Math.round(data.price / 23000)} $</span>
      </div>
      <div className="ratings">
        <StarRatings
          rating={data.ratings}
          starRatedColor="rgb(211 118 26)"
          numberOfStars={5}
          name="rating"
          starDimension="15px"
          starSpacing="1px"
        />
      </div>
      <div className="product_menu">
        <ul>
          <li className="product_menu-item">
            <Link to={`/categories/${data._id}`}>
              <span>
                <FaEye />
              </span>
            </Link>
          </li>
          <li
            className="product_menu-item"
            onClick={() =>
              dispatch(addItemToCart({ id: data._id, quanlityCart: 1 }))
            }
          >
            <span>
              <FaCartPlus />
            </span>
          </li>
          <li className="product_menu-item">
            <span>
              <FaHeart />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
