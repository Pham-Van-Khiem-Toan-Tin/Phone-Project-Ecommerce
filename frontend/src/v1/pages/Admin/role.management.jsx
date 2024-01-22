import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "react-tabs/style/react-tabs.css";
import "./role-management.css";
import { clearError } from "../../reduxToolkit/reducer/role/role.slice";
import { getRoleList } from "../../reduxToolkit/actions/role.actions";

const RoleManagement = ({ SideBarComponent, HeaderComponent }) => {
  const dispatch = useDispatch();
  const { roles, error, isLoading } = useSelector((state) => state.role);
  const [processedRoles, setProcessedRoles] = useState([]);

  useEffect(() => {
    if (roles) {
      setProcessedRoles([...roles]);
    }
  }, [roles]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getRoleList());
  }, [dispatch, error]);

  return (
    <>
      <SideBarComponent />
      <HeaderComponent />
      <div className="role-management">
        <p className="title">Role</p>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <span className="fw-bold">Home</span>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Role
              </li>
            </ol>
          </nav>
          <div className="time-line d-flex gap-2">
          <Link className="btn btn-sm btn-primary" to="/admin/role-management/create">
            Create
          </Link>
          <Link
            className="btn btn-sm btn-primary"
            to="/admin/role-management/update"
          >
            Update
          </Link>
            
          </div>
        </div>
        <Tabs>
          <TabList>
            {processedRoles &&
              processedRoles.map((role) => {
                return <Tab key={role?.role}>{role?.role}</Tab>;
              })}
          </TabList>
          {processedRoles &&
            processedRoles.map((role) => {
              return (
                <TabPanel>
                  <Tabs className={"row"}>
                    <TabList className={"function col-3 d-flex flex-column"}>
                      {role?.functions &&
                        role?.functions.map((fun) => {
                          return <Tab>{fun?.function_name}</Tab>;
                        })}
                    </TabList>
                    <div className="col-9 rounded sub-list">
                      {role?.functions &&
                        role?.functions.map((fun) => {
                          return (
                            <TabPanel>
                              {fun.subList.map((sf) => {
                                return (
                                  <div className="sub-function">
                                    <input
                                      type="checkbox"
                                      checked={fun.include.includes(sf)}
                                      value={sf}
                                      id={sf}
                                      disabled
                                    />
                                    <label htmlFor={sf}>{sf}</label>
                                  </div>
                                );
                              })}
                            </TabPanel>
                          );
                        })}
                    </div>
                  </Tabs>
                </TabPanel>
              );
            })}
        </Tabs>
      </div>
    </>
  );
};

export default RoleManagement;
