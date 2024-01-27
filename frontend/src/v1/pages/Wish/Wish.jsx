import React, { useEffect } from "react";
import { FaTrashAlt, FaAngleDoubleLeft, FaForward } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrorCart,
  resetToCart,
} from "../../reduxToolkit/reducer/product/cartProductSlice";
import "./wish.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { deleteItemWish, getProductWish } from "../../reduxToolkit/actions/wish.action";
const Wish = ({HeaderComponent, FooterComponent}) => {
  const dispatch = useDispatch();
  const { isLoading, error, wishList, success, total } = useSelector(
    (state) => state.wish
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
    dispatch(getProductWish());
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
                      Wish
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="cart-content rounded d-flex align-items-center justify-content-between">
                    <span className="text-uppercase">Shopping wish</span>
                    <span>{wishList?.length} items in your wish</span>
                  </div>
                  <table
                    id="shoppingCart"
                    className="table table-condensed table-responsive"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "60%" }}>Product</th>
                        <th style={{ width: "12%" }}>Price</th>
                        <th style={{ width: "16%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishList?.products &&
                        wishList?.products.map((item) => {
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
                              <td className="actions" data-th="">
                                <div className="text-right">
                                  <button
                                    onClick={() => {
                                      dispatch(
                                        deleteItemWish(item.product_id._id)
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
            </div>
          </section>
        </div>
      )}
      <FooterComponent />
    </>
  );
};

export default Wish;
