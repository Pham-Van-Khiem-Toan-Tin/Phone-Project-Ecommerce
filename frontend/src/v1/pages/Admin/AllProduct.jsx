import React, { useEffect } from "react";
import "./AllProduct.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrorAllProduct } from "../../reduxToolkit/reducer/product/allProductAdminSlice";
import { getAdminProducts } from "../../reduxToolkit/actions/productAction";
const AllProduct = () => {
  const dispatch = useDispatch();
  const { error, product } = useSelector((state) => state.alladminproduct);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorAllProduct);
    }
    dispatch(getAdminProducts());
  }, []);

  return (
    <div className="allproduct table-responsive">
      <div className="container">
        <table>
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
            {product.length > 0 ? (
              product.map((item) => {
                return (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.stock}</td>
                    <td>{item.price}</td>
                    <td className="icon-handle_product">
                      <span>
                        <Link to={`/`}>
                          <FaEdit />
                        </Link>
                      </span>
                      <span>
                        <FaTrashAlt />
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>No product in your shop</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProduct;
