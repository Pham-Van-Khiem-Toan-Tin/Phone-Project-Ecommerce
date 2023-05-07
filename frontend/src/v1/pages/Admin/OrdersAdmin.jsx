import React, { useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./OrdersAdmin.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../reduxToolkit/reducer/order/allOrdersSlice";
import { deleteOrder, getAllOrders } from "../../reduxToolkit/actions/orderAction";
import Loader from "../../components/Loader/Loader";
import { clearErrorOrder, deleteReset } from "../../reduxToolkit/reducer/order/orderSlice";
const OrdersAdmin = () => {
  const dispatch = useDispatch();
  const { error, orders, isLoading } = useSelector((state) => state.allOrders);
  const { error: errorDelete, isLoading: isLoadingDlete, isDelete } = useSelector((state) => state.order);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if(errorDelete) {
      toast.error(errorDelete);
      dispatch(clearErrorOrder());
    }
  }, [dispatch, error, errorDelete]);
  useEffect(() => {
    if(isDelete) {
      toast.success("Order is deleted!!!");
      dispatch(deleteReset())
    }
    dispatch(getAllOrders());
  }, [dispatch, isDelete]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="orders_admin">
          <div className="container table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Items Qty</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders ? (
                  orders.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.orderItems.length}</td>
                        <td>{item.totalPrice}</td>
                        <td>{item.orderStatus}</td>
                        <td className="icon-handle_order">
                          <span>
                            <Link to={`../admin/order/${item._id}`}>
                              <FaEdit />
                            </Link>
                          </span>
                          <span onClick={() => dispatch(deleteOrder(item._id))}>
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
      )}
    </>
  );
};

export default OrdersAdmin;
