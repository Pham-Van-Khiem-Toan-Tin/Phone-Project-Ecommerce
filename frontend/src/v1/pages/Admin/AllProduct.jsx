import React, { useEffect } from "react";
import "./all-product.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/product/allProductAdminSlice";
import {
  deleteProduct,
  getAdminProducts,
} from "../../reduxToolkit/actions/productAction";
import Loader from "../../components/Loader/Loader";
import {
  clearErrorHandle,
  resetDelete,
} from "../../reduxToolkit/reducer/product/productSlice";
const AllProduct = ({ChildrenComponent}) => {
  const dispatch = useDispatch();
  const { error, isLoading, products } = useSelector(
    (state) => state.allProductAdmin
  );
  const {
    error: errorDelete,
    isLoading: isLoadingDelete,
    isDelete,
  } = useSelector((state) => state.product);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (errorDelete) {
      toast.error(errorDelete);
      dispatch(clearErrorHandle());
    }
  }, [dispatch, error, errorDelete]);
  useEffect(() => {
    if (isDelete) {
      toast.success("Product deleted successfully!");
      dispatch(resetDelete());
    }
    dispatch(getAdminProducts());
  }, [dispatch, isDelete]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="all-products">
          <div className="row">
            <div className="col-3"><ChildrenComponent /></div>
            <div className="col-9 pt-5 px-5">
              <div className="top-product rounded p-2">
                <div className="search d-flex align-items-center justify-content-between">
                  <span>Top Product</span>
                  <select className="form-select">
                    <option>Today</option>
                    <option>Week</option>
                    <option>Month</option>
                  </select>
                </div>
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Popularity</th>
                        <th scope="col">Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Home</td>
                        <td >
                          <div
                            className="progress"
                            role="progressbar"
                            aria-label="Example 1px high"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{height: "7px",}}
                          >
                            <div className="progress-bar" style={{width: "25%"}}></div>
                          </div>
                        </td>
                        <td>40%</td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td>Home</td>
                        <td >
                          <div
                            className="progress"
                            role="progressbar"
                            aria-label="Example 1px high"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{height: "7px",}}
                          >
                            <div className="progress-bar" style={{width: "25%"}}></div>
                          </div>
                        </td>
                        <td>40%</td>
                      </tr>
                      <tr>
                        <td>01</td>
                        <td>Home</td>
                        <td >
                          <div
                            className="progress"
                            role="progressbar"
                            aria-label="Example 1px high"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{height: "7px",}}
                          >
                            <div className="progress-bar" style={{width: "25%"}}></div>
                          </div>
                        </td>
                        <td>40%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="last-products p-2 mt-2 rounded">
                <div className="table-responsive">
                  <p className="title">Last Orders</p>
                  <div className="search d-flex align-items-center gap-2 mb-2">
                    <input className="form-control w-50" placeholder="input search"/>
                    <button className="btn btn-sm btn-primary">Search</button>
                  </div>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((product) => {
                          return (
                            <tr>
                              <th scope="row">{product?._id}</th>
                              <td>{product?.name}</td>
                              <td>{product?.category}</td>
                              <td>{product?.price}</td>
                              <td>{product?.stock}</td>
                              <td>
                                {format(
                                  new Date(product?.createdAt),
                                  "dd/MM/yyyy"
                                )}
                              </td>
                              <td className="action">
                                <span>
                                  <Link to={`/admin/product/${product?._id}`}>
                                    <FaEdit />
                                  </Link>
                                </span>
                                <span>
                                  <button
                                    className="text-danger"
                                    onClick={() =>
                                      dispatch(deleteProduct(product?._id))
                                    }
                                    disabled={isLoadingDelete}
                                  >
                                    <FaTrashAlt />
                                  </button>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <div className="container table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.stock}</td>
                        <td>{item.price}</td>
                        <td className="icon-handle_product">
                          <span>
                            <Link to={`/admin/product/${item._id}`}>
                              <FaEdit />
                            </Link>
                          </span>
                          <span>
                            <button onClick={() => dispatch(deleteProduct(item._id))} disabled={isLoadingDelete}>
                              <FaTrashAlt />
                            </button>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProduct;
