import React, { useRef } from "react";
import "./Payment.css";
import {
  useStripe,
  useElements,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaCalendarAlt, FaKey } from "react-icons/fa";
const Payment = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elmements = useElements();
  const navigate = useNavigate();
  const payBtn = useRef(null);
  const orderInfor = JSON.parse(sessionStorage.getItem("orderInfor"));
  const { shippingInfor, cartList } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const order = {
    shippingInfor,
    orderItems: cartList,
    itemsPrice: orderInfor.subtotal,
    taxPrice: orderInfor.tax,
    shippingPrice: orderInfor.shippingCharges,
    totalPrice: orderInfor.totalPrice,
  };
  const paymentData = {
    amount: Math.round(orderInfor.totalPrice / 23000),
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/payment/process`,
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elmements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elmements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfor.address,
              city: shippingInfor.city,
              state: shippingInfor.state,
              postal_code: shippingInfor.pinCode,
              country: shippingInfor.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch();
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="payment container">
      <form onSubmit={submitHandle}>
        <h5>Card Info</h5>
        <div>
          <FaCreditCard />
          <CardNumberElement className="paymentInput" />
        </div>
        <div>
          <FaCalendarAlt />
          <CardExpiryElement className="paymentInput" />
        </div>
        <div>
          <FaKey />
          <CardCvcElement className="paymentInput" />
        </div>
        <input
          type="submit"
          value={`Pay - ${
            orderInfor && Math.round(orderInfor.totalPrice / 23000)
          }`}
          ref={payBtn}
          className="paymentFormBtn"
        />
      </form>
    </div>
  );
};

export default Payment;
