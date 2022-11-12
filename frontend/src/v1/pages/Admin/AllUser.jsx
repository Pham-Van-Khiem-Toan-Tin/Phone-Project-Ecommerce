import React, { useEffect } from "react";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
import { clearError } from "../../reduxToolkit/reducer/user/allUserSlice";
import { allUser } from "../../reduxToolkit/actions/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AllUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, users, isLoading } = useSelector((state) => state.allUsers);
  console.log({ user: users });
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError);
    }
    dispatch(allUser());
  }, [dispatch, toast, error]);
  return (
    <div style={{ width: "100vw" }}>
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row w-100">
            <div className="col-lg-12 col-md-12 col-12">
              <h3 className="display-5 mb-2 text-center">ALL USER</h3>
              <p className="mb-5 text-center">
                <i className="text-info font-weight-bold fs-2">
                  {users.length}
                </i>{" "}
                users in your shop
              </p>
              <table
                id="allUser"
                className="table table-condensed table-responsive"
              >
                <thead>
                  <tr>
                    <th style={{ width: "60%" }}>User</th>
                    <th style={{ width: "12%" }}>Email</th>
                    <th style={{ width: "10%" }}>Role</th>
                    <th style={{ width: "16%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((oneUser) => {
                    return (
                      <tr>
                        <td data-th="avatar-user">
                          <div className="row">
                            <div className="col-md-3 text-left">
                              <img
                                src={oneUser.avatar.url}
                                alt=""
                                className="img-fluid d-none d-md-block rounded mb-2 shadow "
                              />
                            </div>
                            <div className="col-md-9 text-left mt-sm-2">
                              <h4>{oneUser.name}</h4>
                            </div>
                          </div>
                        </td>
                        <td data-th="email-user">{oneUser.email}</td>
                        <td data-th="user-role">{oneUser.role}</td>
                        <td className="actions" data-th="">
                          <div className="text-right">
                            <button className="btn btn-white border-secondary bg-white btn-md mb-2">
                              <BsPencilFill />
                            </button>
                            <button className="btn btn-white border-secondary bg-white btn-md mb-2">
                              <BsFillTrashFill />
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
  );
};

export default AllUser;
