import React, { useRef, useState } from "react";
import RangeSlider from 'react-range-slider-input';
import { Data2 } from "../../../data/Data";
import "./Categories.css";

const Categories = () => {
  
  return (
    <div className="categories">
      <div className="products-controller">
      THis is controller
        <RangeSlider min={0} max={1000} step={100} defaultValue={[0,1000]}/>
      </div>
      <div className="product-gird">This is grid</div>
    </div>
  );
};

export default Categories;
