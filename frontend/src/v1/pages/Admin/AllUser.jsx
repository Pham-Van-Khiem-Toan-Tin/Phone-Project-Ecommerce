import React, { useEffect } from "react";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
import {
  clearError,
  clearDeleteError,
} from "../../reduxToolkit/reducer/user/allUserSlice";
import { allUser, deleteUser } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import "./AllUser.css";
const AllUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, users, isLoading, isDelete, message, deleteError } =
    useSelector((state) => state.allUsers);
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearDeleteError());
    }
    if (isDelete) {
      toast.success(message);
      dispatch(clearDeleteError());
    }
    dispatch(allUser());
  }, [dispatch, toast, error, message, deleteError]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="alluser">
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
              {users ? (
                  users.map((item) => {
                    return (
                      <tr key={item.email}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td className="icon-handle_user">
                          <span>
                            <Link to={`../admin/user/${item._id}`}>
                              <BsPencilFill />
                            </Link>
                          </span>
                          <span>
                            <BsFillTrashFill />
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

export default AllUser;
