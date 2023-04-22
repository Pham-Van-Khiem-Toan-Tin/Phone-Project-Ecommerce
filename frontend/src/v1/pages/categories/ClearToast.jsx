import React, { useEffect } from 'react'
import { clearErrorCart, resetToCart } from "../../reduxToolkit/reducer/product/cartProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ClearToast = () => {
    const dispatch = useDispatch();
    const { error, success } = useSelector((state) => state.cart);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrorCart());
        }
        if (success) {
            toast.success(success);
            dispatch(resetToCart());
        };
    }, [error, success])
    
  return (
    <>
    
    </>
  )
}

export default ClearToast;