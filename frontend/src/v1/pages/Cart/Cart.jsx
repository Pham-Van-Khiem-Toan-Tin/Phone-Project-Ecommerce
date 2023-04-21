import React, { useEffect } from "react";
import {
  BsArrowCounterclockwise,
  BsFillTrashFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrorCart,
  resetToCart,
} from "../../reduxToolkit/reducer/product/cartProductSlice";
import {
  addItemToCart,
  getProductCart,
} from "../../reduxToolkit/actions/cartAction";
import "./Cart.css";
import { Link } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const { isLoading, error, cartList, success, total } = useSelector(
    (state) => state.cart
  );
  const handleChangeQuanlityProduct = () => {
    dispatch();
  };
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorCart());
    }
    if (success) {
      toast.success("Change product in cart success");
      dispatch(resetToCart());
    }
    dispatch(getProductCart());
  }, [error, dispatch, toast, success]);
  return (
    <div style={{ width: "100vw" }} className="cart">
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row w-100">
            <div className="col-lg-12 col-md-12 col-12">
              <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
              <p className="mb-5 text-center">
                <i className="text-info font-weight-bold">3</i> items in your
                cart
              </p>
              <table
                id="shoppingCart"
                className="table table-condensed table-responsive"
              >
                <thead>
                  <tr>
                    <th style={{ width: "60%" }}>Product</th>
                    <th style={{ width: "12%" }}>Price</th>
                    <th style={{ width: "10%" }}>Quantity</th>
                    <th style={{ width: "16%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartList &&
                    cartList.map((item) => {
                      return (
                        <tr key={item.id_product.name}>
                          <td data-th="Product">
                            <div className="row">
                              <div className="col-md-3 text-left">
                                <img
                                  src={item?.id_product.images[0].url}
                                  alt=""
                                  className="img-fluid d-none d-md-block rounded mb-2 shadow"
                                />
                              </div>
                              <div className="col-md-9 text-left mt-sm-2">
                                <h4>{item?.id_product.name}</h4>
                                <p className="font-weight-light">
                                  {item?.id_product.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td data-th="Price">{item?.id_product.price} đ</td>
                          <td data-th="Quantity" className="Quantity">
                            <button
                              className="w-25"
                              disabled={
                                item.quantity > 1 && !isLoading ? false : true
                              }
                              onClick={(e) => {
                                dispatch(
                                  addItemToCart({
                                    id: item.id_product._id,
                                    quanlityCart: -1,
                                  })
                                );
                              }}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="text-center w-50"
                              value={item?.quantity}
                              min={1}
                              readOnly
                            />
                            <button
                              className="w-25"
                              disabled={isLoading ? true : false}
                              onClick={(e) => {
                                dispatch(
                                  addItemToCart({
                                    id: item.id_product._id,
                                    quanlityCart: 1,
                                  })
                                );
                              }}
                            >
                              +
                            </button>
                          </td>
                          <td className="actions" data-th="">
                            <div className="text-right">
                              <button className="btn btn-white border-secondary bg-white btn-md mb-2">
                                <BsFillTrashFill />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="float-right text-right">
                <h4>Subtotal:</h4>
                <h1>{total} đ</h1>
              </div>
            </div>
          </div>
          <div className="row mt-4 d-flex align-items-center">
            <div className="col-sm-6 order-md-2 text-right">
              <Link
                to="/login?redirect=../shipping"
                className="btn btn-primary mb-4 btn-lg pl-5 pr-5"
              >
                Checkout
              </Link>
            </div>
            <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
              <Link
                to="/categories"
                style={{ color: "#fff", fontSize: "24px" }}
              >
                <BsFillArrowLeftSquareFill
                  style={{ display: "inline-block" }}
                />{" "}
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
