import React, { useEffect } from "react";
import { FaTrashAlt, FaAngleDoubleLeft, FaForward } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrorCart,
  resetToCart,
} from "../../reduxToolkit/reducer/product/cartProductSlice";
import {
  addItemToCart,
  deleteItemCart,
  getProductCart,
} from "../../reduxToolkit/actions/cartAction";
import "./Cart.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
const Cart = () => {
  const dispatch = useDispatch();
  const { isLoading, error, cartList, success, total } = useSelector(
    (state) => state.cart
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorCart());
    }
  }, [error, dispatch]);
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetToCart());
    }
    dispatch(getProductCart());
  }, [dispatch, success]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="cart">
          <section className="pb-5">
            <div className="container">
              <div className="row w-100">
                <div className="col-lg-12 col-md-12 col-12">
                  <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
                  <p className="mb-5 text-center">
                    <i className="text-info font-weight-bold">
                      {cartList?.length}
                    </i>{" "}
                    items in your cart
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
                              <td data-th="Price">
                                {item?.id_product.price} đ
                              </td>
                              <td data-th="Quantity" className="Quantity">
                                <button
                                  className="w-25"
                                  disabled={
                                    item.quantity > 1 && !isLoading
                                      ? false
                                      : true
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
                                  <button
                                    onClick={() => {
                                      dispatch(
                                        deleteItemCart(item.id_product._id)
                                      );
                                    }}
                                    className="btn btn-white border-secondary bg-white btn-md mb-2"
                                  >
                                    <FaTrashAlt />
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
              <div className="button-handle">
                <div className="button-shipping">
                  <Link to="/categories">
                    <FaAngleDoubleLeft /> Continue Shopping
                  </Link>
                </div>
                <div className="button-checkout">
                  <Link to="../shipping">
                    Checkout <FaForward />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Cart;
