import React from 'react'
import "./cardBrand.css";
import brand from "../../../data/imgTest/brand.png"
const CardBrand = (props) => {
    const {data} = props;
  return (
    <div className='card-brand'>
        <img className='rounded' src={data} alt='' />
    </div>
  )
}

export default CardBrand