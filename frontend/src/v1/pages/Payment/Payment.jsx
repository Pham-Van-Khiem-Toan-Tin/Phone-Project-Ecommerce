import React from 'react'
import "./Payment.css";
import { useDispatch } from 'react-redux';
const Payment = () => {
    const dispatch = useDispatch();
    const orderInfor = JSON.parse(sessionStorage.getItem("orderInfor"));
  return (
    <div className='payment'>
        <form>
            <label htmlFor='card-payment-num'>Card-number</label>
            <input type='text' id="card-payment-num" name="card-num" placeholder="1234 5678 9012 3457" size="17" minlength="19" maxlength="19"/>
            <label htmlFor='card-payment-name'>Card-name</label>
            <input type="text" id='card-payment-name' name="name" placeholder="Name" size="17"/>
            <label htmlFor='exp'>Card-month</label>
            <input name="exp" placeholder="MM/YYYY" size="7" id="exp" minlength="7" maxlength="7"/>
            <label htmlFor='card-payment-pass'>Card-pass</label>
            <input type="password" id='card-payment-pass' name="cvv" placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
            <input type='submit'/>
        </form>
    </div>
  )
}

export default Payment