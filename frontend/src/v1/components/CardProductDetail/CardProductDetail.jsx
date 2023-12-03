import React from 'react'
import "./card-product-detail.css"
const CardProductDetail = ({data}) => {
    
  return (
    <div className='card-product-detail w-100'>
        <img src={data.url} width={100}  alt={data._id} />
    </div>
  )
}

export default CardProductDetail