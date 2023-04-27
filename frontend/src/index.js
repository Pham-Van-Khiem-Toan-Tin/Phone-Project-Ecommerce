import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./v1/reduxToolkit/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51N1RFRJt1tz4StSkzTUdq8lq3KZC2XWUdkXxzMMooea7J3X3TdZlAVeKC3qM1p4MaA5KQjvpuLqT6hYDdsp1iiui00gYWdz4T1");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Elements>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
