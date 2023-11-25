import React from 'react';
import techdeal from "../../../data/imgTest/techdeal.jpg";
import "./cardTechDeal.css";
import { Link } from 'react-router-dom';
const CardTechDeal = (props) => {
    const {data} = props;
  return (
    <div className='card-tech-deal'>
        <Link to="/categories">
            <div className='card-tech-title'>
                <img className='rounded-circle' src={techdeal} alt='' />
            </div>
            <div className='card-tech-body'>
                <span>
                    Gamming
                </span>
            </div>
        </Link>
    </div>
  )
}

export default CardTechDeal