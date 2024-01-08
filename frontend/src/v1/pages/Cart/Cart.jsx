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
import "./cart.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
const Cart = ({HeaderComponent, FooterComponent}) => {
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
    <HeaderComponent />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="cart">
          <section className="pb-5">
            <div className="container">
              <div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <span className="fw-bold">Home</span>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Cart
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="cart-content rounded d-flex align-items-center justify-content-between">
                    <span className="text-uppercase">Shopping cart</span>
                    <span>{cartList?.length} items in your cart</span>
                  </div>
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
                            <tr key={item.product_id.name}>
                              <td data-th="Product">
                                <div className="row">
                                  <div className="col-md-3 text-left">
                                    <img
                                      src={item?.product_id.images[0].url}
                                      alt=""
                                      className="img-fluid rounded d-none d-md-block rounded mb-2 shadow"
                                    />
                                  </div>
                                  <div className="col-md-9 text-left mt-sm-2">
                                    <p className="name">
                                      {item?.product_id.name}
                                    </p>
                                    <p className="font-weight-light">
                                      {item?.product_id.category}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td data-th="Price">
                                {Math.round(item?.product_id.price/23000)} $
                              </td>
                              <td data-th="Quantity" className="quality">
                                <button
                                  className="w-25 subtraction"
                                  disabled={
                                    item.quantity > 1 && !isLoading
                                      ? false
                                      : true
                                  }
                                  onClick={(e) => {
                                    dispatch(
                                      addItemToCart({
                                        id: item.product_id._id,
                                        quanlityCart: -1,
                                      })
                                    );
                                  }}
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  className="w-50 border-0 fw-bold quanlity-value"
                                  value={item?.quantity}
                                  min={1}
                                  readOnly
                                />
                                <button
                                  className="w-25 summation"
                                  disabled={isLoading ? true : false}
                                  onClick={(e) => {
                                    dispatch(
                                      addItemToCart({
                                        id: item.product_id._id,
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
                                        deleteItemCart(item.product_id._id)
                                      );
                                    }}
                                    className="btn btn-delete btn-white border-0 btn-sm"
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
                </div>
              </div>
              <div className="button-handle d-flex align-items-center justify-content-between">
                <Link
                  to="/categories"
                  className="text-white btn btn-sm btn-primary d-flex align-items-center gap-1"
                >
                  <FaAngleDoubleLeft className="d-block" /> Continue Shopping
                </Link>
                <Link
                  to="../shipping"
                  className="text-white btn btn-sm btn-danger"
                >
                  Checkout {Math.round(total/23000)} $
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
      <FooterComponent />
    </>
  );
};

export default Cart;
