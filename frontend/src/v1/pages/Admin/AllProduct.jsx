import React, { useEffect } from "react";
import "./AllProduct.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/product/allProductAdminSlice";
import { deleteProduct, getAdminProducts } from "../../reduxToolkit/actions/productAction";
import Loader from "../../components/Loader/Loader";
import { clearErrorHandle, resetDelete } from "../../reduxToolkit/reducer/product/productSlice";
const AllProduct = () => {
  const dispatch = useDispatch();
  const { error, isLoading, products } = useSelector(
    (state) => state.allProductAdmin
  );
  const { error: errorDelete, isLoading: isLoadingDelete, isDelete } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if(errorDelete) {
      toast.error(errorDelete);
      dispatch(clearErrorHandle());
    }
  }, [dispatch, error, errorDelete]);
  useEffect(() => {
    if(isDelete) {
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
        <div className="allproduct table-responsive">
          <div className="container table-responsive">
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
          </div>
        </div>
      )}
    </>
  );
};

export default AllProduct;
