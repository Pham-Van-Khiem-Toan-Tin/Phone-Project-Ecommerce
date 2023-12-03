import React, { useState } from "react";
import "./product-detail-tabs.css";
const ProductDetailTabs = (props) => {
    const {description} = props;
  const [tabOpen, setTabOpen] = useState(true);
  const handleReviews = () => {
    setTabOpen(false);
  };
  const handleDes = () => {
    setTabOpen(true);
  };
  return (
    <div className="detail-tabs mt-5">
      <ul className="nav nav-tabs d-flex align-items-center gap-1 justify-content-center">
        <li className=" nav-item ">
          <button
            className={"nav-link " + (tabOpen ? "active" : "") }
            onClick={handleDes}
            data-toggle="tab"
            // href="#home"
          >
            Description
          </button>
        </li>
        <li className="nav-item">
          <button
            className={"nav-link " + (!tabOpen ? "active" : "") }
            onClick={handleReviews}
            data-toggle="tab"
            // href="#menu1"
          >
            Reviews 
          </button>
        </li>
      </ul>
      <div className="tab-content">
        <div id="home" className={tabOpen ? "d-block" : "d-none"}>
          <h3>Description</h3>
          <p>
           {description}
          </p>
        </div>
        <div id="menu1" className={!tabOpen ? "d-block" : "d-none"}>
          <h3>Reviews</h3>

          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTabs;
