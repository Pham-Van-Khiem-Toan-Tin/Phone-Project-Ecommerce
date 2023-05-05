import React, { useState } from 'react';
import { FaHome, FaMapMarkerAlt, FaPhone, FaGlobeAsia, FaRegBuilding } from "react-icons/fa";
import "./Shipping.css";
import { useDispatch, useSelector } from "react-redux";
import {shippingInforSubmit} from "../../reduxToolkit/reducer/product/cartProductSlice"
import { useNavigate } from 'react-router-dom';
const Shipping = () => {
  const dispatch = useDispatch();
  const {shippingInfor} = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfor ? shippingInfor?.address : "");
  const [city, setCity] = useState(shippingInfor ? shippingInfor?.city : "");
  const [state, setState] = useState(shippingInfor ? shippingInfor?.state : "");
  const [country, setCountry] = useState(shippingInfor ? shippingInfor?.country : "");
  const [pinCode, setPinCode] = useState(shippingInfor ? shippingInfor?.pinCode : "");
  const [phone, setPhone] = useState(shippingInfor ? shippingInfor?.phone : "");
  const navigate = useNavigate();
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const formShipping = {
      address: address,
      city: city,
      state: state,
      country: "VN",
      phoneNum: phone,
      pinCode: pinCode,
    }
    dispatch(shippingInforSubmit(formShipping));
    navigate("../order/confirm");
  }
  return (
    <div className='shipping container'>
    <h3>Shipping</h3>
    <form onSubmit={handleShippingSubmit}>
      <div>
      <FaHome/>
        <input className='shipping-input' value={address}  required onChange={(e) => setAddress(e.target.value)} type='text' placeholder='Address' />
      </div>
      <div>
      <FaRegBuilding />
        <input className='shipping-input' value={city} required onChange={(e) => setCity(e.target.value)} type='' placeholder='City' />
      </div>
      <div>
      <FaRegBuilding />
        <input className='shipping-input' value={state} required onChange={(e) => setState(e.target.value)} type='' placeholder='State' />
      </div>
      <div>
      <FaMapMarkerAlt />
        <input className='shipping-input' value={pinCode} required onChange={(e) => setPinCode(e.target.value)} type='' placeholder='Pin Code' />
      </div>
      <div>
      <FaPhone />
        <input className='shipping-input' value={phone} required onChange={(e) => setPhone(e.target.value)} type='tel' placeholder='Phone Number' />
      </div>
      <div>
      <FaGlobeAsia />
        <input className='shipping-input' value={country} required onChange={(e) => setCountry(e.target.value)} type='' placeholder='Country'/>
      </div>
      <input className='shipping-submit' type='submit' value={"Continue"}/>
    </form>
    </div>
  )
}

export default Shipping;