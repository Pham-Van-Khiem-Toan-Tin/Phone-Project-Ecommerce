import React, { useEffect, useRef } from "react";
import "./payment.css";
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
import { createOrder } from "../../reduxToolkit/actions/order.action";
import { clearError } from "../../reduxToolkit/reducer/order/newOrderSlice";
const Payment = ({ HeaderComponent, FooterComponent }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elmements = useElements();
  const navigate = useNavigate();
  const payBtn = useRef(null);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartList } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const listOrder = [];
  for (let i in cartList) {
    listOrder.push({
      name: cartList[i].product_id.name,
      price: cartList[i].product_id.price,
      image: cartList[i].product_id.images[0].url,
      product: cartList[i].product_id._id,
      quantity: cartList[i].quantity,
    });
  }
  const order = {
    shippingInfo,
    orderItems: listOrder,
    itemsPrice: orderInfo.subtotal,
    taxPrice: Math.round( orderInfo.tax / 23000),
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: Math.round( orderInfo.totalPrice / 23000),
  };
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice / 23000),
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
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
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
          dispatch(createOrder(order));
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
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <>
      <HeaderComponent />
      <div className="payment">
        <div className="container d-flex align-items-center justify-content-center">
          <form onSubmit={submitHandle} className="rounded">
            <p>Card Info</p>
            <div className="field">
              <FaCreditCard />
              <CardNumberElement className="paymentInput form-control" />
            </div>
            <div className="field">
              <FaCalendarAlt />
              <CardExpiryElement className="paymentInput form-control" />
            </div>
            <div className="field">
              <FaKey />
              <CardCvcElement className="paymentInput form-control" />
            </div>
            <input
              type="submit"
              value={`Pay - ${
                orderInfo && Math.round(orderInfo.totalPrice / 23000)
              }$`}
              ref={payBtn}
              className="btn btn-submit btn-sm btn-warning text-danger"
            />
          </form>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Payment;
