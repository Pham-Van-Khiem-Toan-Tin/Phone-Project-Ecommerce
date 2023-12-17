import React from "react";
import "./step.css";
const Steps = (props) => {
  const { step } = props;
  const widthProgress = {
    1: 10,
    2: 50,
    3: 90,
    4: 100,
  };
  return (
    <div className="steps">
      <div
        className="progress"
        role="progressbar"
        aria-label="progressPay"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="progress-bar"
          style={{ width: `${widthProgress[step]}%` }}
        ></div>
      </div>
      <div className={`shipping-step step ${step >= 1 ? "active" : ""}`}>
        <span>Shipping</span>
      </div>
      <div className={`checkout-step step ${step >= 2 ? "active" : ""}`}>
        <span>Checkout</span>
      </div>
      <div className={`payment-step step ${step >= 3 ? "active" : ""}`}>
        <span>Payment</span>
      </div>
    </div>
  );
};

export default Steps;
