import React, { useEffect } from "react";
import "./MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../reduxToolkit/reducer/order/myOrderSlice";
import { myOrders } from "../../reduxToolkit/actions/orderAction";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
import Loader from "../../components/Loader/Loader";
const MyOrders = () => {
  const dispatch = useDispatch();
  const { isLoading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  console.log(rows);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(myOrders());
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="myorders">
          <div className="container table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Status</th>
                  <th scope="col">Item Qty</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows ? (
                  rows.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.status}</td>
                        <td>{item.itemsQty}</td>
                        <td>{item.amount}</td>
                        <td className="icon-handle_user">
                          <span>
                            <BsPencilFill />
                          </span>
                          <span>
                            <BsFillTrashFill />
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div>No order in your order</div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;
