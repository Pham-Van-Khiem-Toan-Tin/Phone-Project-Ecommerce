import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import "./OrdersAdmin.css";
import { useDispatch } from "react-redux";
const OrdersAdmin = () => {
  const dispatch = useDispatch();
  
  return (
    <div className="orders_admin">
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {users ? (
                  users.map((item) => {
                    return (
                      <tr key={item.email}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td className="icon-handle_order">
                          <span>
                            <Link to={`../admin/user/${item._id}`}>
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
                )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersAdmin;
