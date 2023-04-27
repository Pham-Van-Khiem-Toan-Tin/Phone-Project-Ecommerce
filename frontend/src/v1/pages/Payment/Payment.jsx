import React from 'react'
import "./Payment.css";
const Payment = () => {
  return (
    <div className='payment'>
        <form>
            <h5>Card-number</h5>
            <input type='text' id="cardnum" name="card-num" placeholder="1234 5678 9012 3457" size="17" id="cno" minlength="19" maxlength="19"/>
            <h5>Card-name</h5>
            <input type="text" name="name" placeholder="Name" size="17"/>
            <h5>Card-month</h5>
            <input name="exp" placeholder="MM/YYYY" size="7" id="exp" minlength="7" maxlength="7"/>
            <h5>Card-pass</h5>
            <input type="password" name="cvv" placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
            <input type='submit'/>
        </form>
    </div>
  )
}

export default Payment