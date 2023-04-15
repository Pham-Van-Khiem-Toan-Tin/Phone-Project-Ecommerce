import React, { useEffect } from "react";
import "./AllProduct.css";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
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
    return () => {};
  }, []);

  return (
    <div className="allproduct">
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
                    <td>Cell 5</td>
                  </tr>
                );
              })) :
            (<div>No product in your shop
            </div>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProduct;
